const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// =============================================================
// MNC-GRADE SCHEMA — SQLite-adapted (auto-migrates on boot)
// UUID → INTEGER AUTOINCREMENT | TIMESTAMPTZ → INTEGER (unix)
// PARTITION BY RANGE → not needed in SQLite at this scale
// =============================================================

db.exec(`

  -- ============================================================
  -- DOMAIN: USERS & AUTH
  -- ============================================================
  CREATE TABLE IF NOT EXISTS users (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    username         TEXT    UNIQUE NOT NULL,
    email            TEXT    UNIQUE,
    phone            TEXT    UNIQUE,
    full_name        TEXT,
    avatar_url       TEXT,
    date_of_birth    TEXT,
    gender           TEXT,
    locale           TEXT    NOT NULL DEFAULT 'en-IN',
    timezone         TEXT    NOT NULL DEFAULT 'Asia/Kolkata',
    currency_code    TEXT    NOT NULL DEFAULT 'INR',
    country_code     TEXT    NOT NULL DEFAULT 'IN',
    password         TEXT    NOT NULL,
    role             TEXT    NOT NULL DEFAULT 'User'
                                CHECK(role IN ('Admin','Seller','User','Staff')),
    status           TEXT    NOT NULL DEFAULT 'active'
                                CHECK(status IN ('active','suspended','deleted','pending_verify')),
    tier             TEXT    NOT NULL DEFAULT 'standard'
                                CHECK(tier IN ('standard','silver','gold','platinum','prime')),
    loyalty_points   INTEGER NOT NULL DEFAULT 0,
    referral_code    TEXT    UNIQUE,
    referred_by      INTEGER REFERENCES users(id),
    email_verified   INTEGER NOT NULL DEFAULT 0,
    phone_verified   INTEGER NOT NULL DEFAULT 0,
    kyc_status       TEXT    DEFAULT 'unverified',
    last_login_at    INTEGER,
    last_login_ip    TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    deleted_at       INTEGER
  );

  CREATE TABLE IF NOT EXISTS user_addresses (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label            TEXT,
    full_name        TEXT    NOT NULL,
    phone            TEXT    NOT NULL,
    address_line1    TEXT    NOT NULL,
    address_line2    TEXT,
    city             TEXT    NOT NULL,
    state            TEXT    NOT NULL,
    postal_code      TEXT    NOT NULL,
    country_code     TEXT    NOT NULL DEFAULT 'IN',
    latitude         REAL,
    longitude        REAL,
    geohash          TEXT,
    is_default       INTEGER NOT NULL DEFAULT 0,
    is_verified      INTEGER NOT NULL DEFAULT 0,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS user_sessions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_token_jti TEXT    NOT NULL UNIQUE,
    refresh_token    TEXT    NOT NULL,
    ip_address       TEXT,
    user_agent       TEXT,
    device_type      TEXT,
    country_code     TEXT,
    is_active        INTEGER NOT NULL DEFAULT 1,
    expires_at       INTEGER NOT NULL,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    revoked_at       INTEGER
  );

  CREATE TABLE IF NOT EXISTS user_devices (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_fingerprint TEXT  NOT NULL,
    platform         TEXT,
    os_version       TEXT,
    app_version      TEXT,
    push_token       TEXT,
    is_trusted       INTEGER DEFAULT 0,
    last_seen_at     INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: PRODUCT CATALOG
  -- ============================================================
  CREATE TABLE IF NOT EXISTS categories (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id        INTEGER REFERENCES categories(id),
    name             TEXT    NOT NULL,
    slug             TEXT    NOT NULL UNIQUE,
    description      TEXT,
    image_url        TEXT,
    icon_url         TEXT,
    meta_title       TEXT,
    meta_description TEXT,
    depth_level      INTEGER NOT NULL DEFAULT 0,
    path             TEXT,
    display_order    INTEGER NOT NULL DEFAULT 0,
    is_active        INTEGER NOT NULL DEFAULT 1,
    commission_pct   REAL    DEFAULT 0,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS brands (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT    NOT NULL UNIQUE,
    slug             TEXT    NOT NULL UNIQUE,
    logo_url         TEXT,
    banner_url       TEXT,
    description      TEXT,
    country_of_origin TEXT,
    is_verified      INTEGER DEFAULT 0,
    is_active        INTEGER DEFAULT 1,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS products (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id        INTEGER NOT NULL REFERENCES users(id),
    brand_id         INTEGER REFERENCES brands(id),
    category_id      INTEGER REFERENCES categories(id),
    name             TEXT    NOT NULL,
    title            TEXT,
    slug             TEXT    UNIQUE,
    description      TEXT,
    short_description TEXT,
    sku_prefix       TEXT,
    barcode          TEXT,
    product_type     TEXT    NOT NULL DEFAULT 'physical'
                                CHECK(product_type IN ('physical','digital','service','subscription')),
    status           TEXT    NOT NULL DEFAULT 'active'
                                CHECK(status IN ('draft','pending_review','active','paused','archived')),
    price            REAL    NOT NULL,
    base_price       REAL,
    compare_price    REAL,
    cost_price       REAL,
    currency_code    TEXT    NOT NULL DEFAULT 'INR',
    tax_class        TEXT,
    gst_rate         REAL,
    avg_rating       REAL    DEFAULT 0,
    review_count     INTEGER DEFAULT 0,
    sold_count       INTEGER DEFAULT 0,
    view_count       INTEGER DEFAULT 0,
    wishlist_count   INTEGER DEFAULT 0,
    is_featured      INTEGER DEFAULT 0,
    is_bestseller    INTEGER DEFAULT 0,
    meta_title       TEXT,
    meta_description TEXT,
    tags             TEXT,   -- JSON array stored as TEXT
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    published_at     INTEGER
  );

  CREATE TABLE IF NOT EXISTS product_variants (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id       INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku              TEXT    NOT NULL UNIQUE,
    title            TEXT    NOT NULL,
    option1_name     TEXT,
    option1_value    TEXT,
    option2_name     TEXT,
    option2_value    TEXT,
    option3_name     TEXT,
    option3_value    TEXT,
    price            REAL    NOT NULL,
    compare_price    REAL,
    cost_price       REAL,
    weight_grams     INTEGER,
    length_mm        INTEGER,
    width_mm         INTEGER,
    height_mm        INTEGER,
    barcode          TEXT,
    is_active        INTEGER NOT NULL DEFAULT 1,
    position         INTEGER DEFAULT 0,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS product_images (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id       INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id       INTEGER REFERENCES product_variants(id),
    cdn_url          TEXT    NOT NULL,
    thumbnail_url    TEXT,
    alt_text         TEXT,
    width            INTEGER,
    height           INTEGER,
    file_size_bytes  INTEGER,
    mime_type        TEXT,
    is_primary       INTEGER DEFAULT 0,
    display_order    INTEGER DEFAULT 0,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS product_attributes (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id       INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    attr_name        TEXT    NOT NULL,
    attr_value       TEXT    NOT NULL,
    attr_unit        TEXT,
    is_filterable    INTEGER DEFAULT 1,
    is_visible       INTEGER DEFAULT 1
  );

  -- ============================================================
  -- DOMAIN: INVENTORY & WAREHOUSING
  -- ============================================================
  CREATE TABLE IF NOT EXISTS warehouses (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT    NOT NULL,
    code             TEXT    NOT NULL UNIQUE,
    warehouse_type   TEXT    NOT NULL DEFAULT 'fulfillment_center',
    address_line1    TEXT,
    city             TEXT,
    state            TEXT,
    country_code     TEXT    DEFAULT 'IN',
    postal_code      TEXT,
    latitude         REAL,
    longitude        REAL,
    geohash          TEXT,
    total_area_sqft  INTEGER,
    is_active        INTEGER NOT NULL DEFAULT 1,
    contact_phone    TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS inventory (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    variant_id       INTEGER NOT NULL REFERENCES product_variants(id),
    warehouse_id     INTEGER NOT NULL REFERENCES warehouses(id),
    qty_on_hand      INTEGER NOT NULL DEFAULT 0,
    qty_reserved     INTEGER NOT NULL DEFAULT 0,
    qty_incoming     INTEGER NOT NULL DEFAULT 0,
    reorder_point    INTEGER NOT NULL DEFAULT 10,
    reorder_qty      INTEGER NOT NULL DEFAULT 50,
    bin_location     TEXT,
    last_counted_at  INTEGER,
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    UNIQUE(variant_id, warehouse_id),
    CHECK(qty_on_hand >= 0),
    CHECK(qty_reserved >= 0),
    CHECK(qty_on_hand >= qty_reserved)
  );

  CREATE TABLE IF NOT EXISTS inventory_transactions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    variant_id       INTEGER NOT NULL,
    warehouse_id     INTEGER NOT NULL,
    txn_type         TEXT    NOT NULL,
    qty_delta        INTEGER NOT NULL,
    reference_type   TEXT,
    reference_id     INTEGER,
    cost_per_unit    REAL,
    performed_by     INTEGER,
    notes            TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: CARTS & ORDERS
  -- ============================================================
  CREATE TABLE IF NOT EXISTS carts (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER REFERENCES users(id),
    session_id       TEXT,
    currency_code    TEXT    NOT NULL DEFAULT 'INR',
    coupon_code      TEXT,
    discount_amount  REAL    DEFAULT 0,
    notes            TEXT,
    status           TEXT    NOT NULL DEFAULT 'active'
                                CHECK(status IN ('active','converted','abandoned','expired')),
    expires_at       INTEGER,
    converted_at     INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id          INTEGER REFERENCES carts(id) ON DELETE CASCADE,
    user_id          INTEGER REFERENCES users(id),
    product_id       INTEGER NOT NULL REFERENCES products(id),
    variant_id       INTEGER REFERENCES product_variants(id),
    quantity         INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
    unit_price       REAL,
    seller_id        INTEGER,
    saved_for_later  INTEGER DEFAULT 0,
    added_at         INTEGER NOT NULL DEFAULT (unixepoch()),
    UNIQUE(user_id, product_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number     TEXT    UNIQUE,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    cart_id          INTEGER REFERENCES carts(id),
    product_id       INTEGER,                     -- legacy column kept
    quantity         INTEGER,                     -- legacy column kept
    status           TEXT    NOT NULL DEFAULT 'pending_payment'
                                CHECK(status IN ('pending_payment','payment_failed','confirmed',
                                  'processing','shipped','delivered','cancelled','refunded')),
    payment_status   TEXT    NOT NULL DEFAULT 'pending',
    fulfillment_status TEXT  NOT NULL DEFAULT 'unfulfilled',

    -- Shipping snapshot
    shipping_name    TEXT,
    shipping_phone   TEXT,
    shipping_line1   TEXT,
    shipping_city    TEXT,
    shipping_state   TEXT,
    shipping_postal  TEXT,
    shipping_country TEXT    DEFAULT 'IN',

    -- Financials
    currency_code    TEXT    DEFAULT 'INR',
    subtotal         REAL    DEFAULT 0,
    discount_amount  REAL    DEFAULT 0,
    coupon_code      TEXT,
    shipping_fee     REAL    DEFAULT 0,
    tax_amount       REAL    DEFAULT 0,
    total_amount     REAL    DEFAULT 0,
    refunded_amount  REAL    DEFAULT 0,

    source_channel   TEXT,
    notes            TEXT,

    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    confirmed_at     INTEGER,
    delivered_at     INTEGER,
    cancelled_at     INTEGER,
    cancel_reason    TEXT
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id         INTEGER NOT NULL REFERENCES orders(id),
    variant_id       INTEGER,
    seller_id        INTEGER,
    warehouse_id     INTEGER,
    sku              TEXT,
    product_title    TEXT    NOT NULL,
    variant_title    TEXT,
    image_url        TEXT,
    quantity         INTEGER NOT NULL,
    unit_price       REAL    NOT NULL,
    discount_amount  REAL    NOT NULL DEFAULT 0,
    tax_amount       REAL    NOT NULL DEFAULT 0,
    total_amount     REAL    NOT NULL,
    status           TEXT    NOT NULL DEFAULT 'confirmed',
    returned_qty     INTEGER NOT NULL DEFAULT 0,
    refunded_amount  REAL    NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS order_status_history (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id         INTEGER NOT NULL REFERENCES orders(id),
    from_status      TEXT,
    to_status        TEXT    NOT NULL,
    changed_by       INTEGER,
    change_reason    TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: PAYMENTS
  -- ============================================================
  CREATE TABLE IF NOT EXISTS payment_methods (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider         TEXT    NOT NULL,
    method_type      TEXT    NOT NULL,
    provider_pm_id   TEXT    NOT NULL,
    display_name     TEXT,
    card_brand       TEXT,
    card_last4       TEXT,
    card_exp_month   INTEGER,
    card_exp_year    INTEGER,
    upi_id           TEXT,
    bank_name        TEXT,
    is_default       INTEGER DEFAULT 0,
    is_verified      INTEGER DEFAULT 0,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS payment_transactions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id         INTEGER NOT NULL REFERENCES orders(id),
    user_id          INTEGER NOT NULL,
    pm_id            INTEGER REFERENCES payment_methods(id),
    provider         TEXT    NOT NULL DEFAULT 'manual',
    provider_txn_id  TEXT    UNIQUE,
    txn_type         TEXT    NOT NULL DEFAULT 'charge',
    status           TEXT    NOT NULL DEFAULT 'initiated'
                                CHECK(status IN ('initiated','pending','success','failed','cancelled','expired')),
    amount           REAL    NOT NULL,
    currency_code    TEXT    NOT NULL DEFAULT 'INR',
    gateway_fee      REAL,
    failure_code     TEXT,
    failure_message  TEXT,
    risk_score       INTEGER,
    gateway_response TEXT,   -- JSON stored as TEXT
    ip_address       TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    completed_at     INTEGER
  );

  CREATE TABLE IF NOT EXISTS wallets (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL UNIQUE REFERENCES users(id),
    balance          REAL    NOT NULL DEFAULT 0,
    locked_balance   REAL    NOT NULL DEFAULT 0,
    currency_code    TEXT    NOT NULL DEFAULT 'INR',
    version          INTEGER NOT NULL DEFAULT 1,
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS wallet_ledger (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_id        INTEGER NOT NULL REFERENCES wallets(id),
    entry_type       TEXT    NOT NULL CHECK(entry_type IN ('credit','debit','lock','unlock')),
    amount           REAL    NOT NULL,
    balance_after    REAL    NOT NULL,
    reference_type   TEXT,
    reference_id     INTEGER,
    description      TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: LOGISTICS & SHIPPING
  -- ============================================================
  CREATE TABLE IF NOT EXISTS shipping_carriers (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT    NOT NULL,
    code             TEXT    NOT NULL UNIQUE,
    tracking_url     TEXT,
    is_active        INTEGER DEFAULT 1,
    avg_delivery_days INTEGER
  );

  CREATE TABLE IF NOT EXISTS shipments (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id         INTEGER NOT NULL REFERENCES orders(id),
    carrier_id       INTEGER REFERENCES shipping_carriers(id),
    warehouse_id     INTEGER REFERENCES warehouses(id),
    tracking_number  TEXT    NOT NULL,
    label_url        TEXT,
    status           TEXT    NOT NULL DEFAULT 'label_created',
    shipping_mode    TEXT,
    weight_grams     INTEGER,
    shipping_cost    REAL,
    cod_amount       REAL    DEFAULT 0,
    estimated_delivery INTEGER,
    actual_delivery  INTEGER,
    dispatched_at    INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS shipment_tracking_events (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    shipment_id      INTEGER NOT NULL REFERENCES shipments(id),
    status           TEXT    NOT NULL,
    description      TEXT,
    location_name    TEXT,
    city             TEXT,
    latitude         REAL,
    longitude        REAL,
    carrier_timestamp INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: SELLERS / MARKETPLACE
  -- ============================================================
  CREATE TABLE IF NOT EXISTS sellers (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL UNIQUE REFERENCES users(id),
    display_name     TEXT    NOT NULL,
    slug             TEXT    NOT NULL UNIQUE,
    logo_url         TEXT,
    banner_url       TEXT,
    description      TEXT,
    business_type    TEXT,
    gstin            TEXT,
    pan_number       TEXT,
    status           TEXT    NOT NULL DEFAULT 'pending_kyc'
                                CHECK(status IN ('pending_kyc','active','suspended','terminated')),
    kyc_status       TEXT    DEFAULT 'pending',
    tier             TEXT    DEFAULT 'standard',
    avg_rating       REAL    DEFAULT 0,
    order_count      INTEGER DEFAULT 0,
    return_rate_pct  REAL    DEFAULT 0,
    fulfillment_rate_pct REAL DEFAULT 100,
    settlement_cycle TEXT    DEFAULT 'T+7',
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS seller_settlements (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id        INTEGER NOT NULL REFERENCES sellers(id),
    period_start     TEXT    NOT NULL,
    period_end       TEXT    NOT NULL,
    gross_sales      REAL    NOT NULL DEFAULT 0,
    returns_total    REAL    NOT NULL DEFAULT 0,
    commission_total REAL    NOT NULL DEFAULT 0,
    tds_total        REAL    NOT NULL DEFAULT 0,
    shipping_charges REAL    NOT NULL DEFAULT 0,
    adjustments      REAL    NOT NULL DEFAULT 0,
    net_payout       REAL    NOT NULL DEFAULT 0,
    status           TEXT    NOT NULL DEFAULT 'processing',
    utr_number       TEXT,
    paid_at          INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: REVIEWS & RATINGS
  -- ============================================================
  CREATE TABLE IF NOT EXISTS product_reviews (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id       INTEGER NOT NULL REFERENCES products(id),
    variant_id       INTEGER,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    order_item_id    INTEGER REFERENCES order_items(id),
    rating           INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    title            TEXT,
    body             TEXT,
    pros             TEXT,   -- JSON array
    cons             TEXT,   -- JSON array
    is_verified_purchase INTEGER DEFAULT 0,
    status           TEXT    NOT NULL DEFAULT 'pending'
                                CHECK(status IN ('pending','approved','rejected','flagged')),
    helpful_votes    INTEGER DEFAULT 0,
    not_helpful_votes INTEGER DEFAULT 0,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    UNIQUE(user_id, order_item_id)
  );

  CREATE TABLE IF NOT EXISTS review_media (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id        INTEGER NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
    media_type       TEXT    NOT NULL CHECK(media_type IN ('image','video')),
    cdn_url          TEXT    NOT NULL,
    thumbnail_url    TEXT,
    display_order    INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS wishlists (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    name             TEXT    NOT NULL DEFAULT 'My Wishlist',
    is_public        INTEGER DEFAULT 0,
    share_token      TEXT    UNIQUE,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS wishlist_items (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    wishlist_id      INTEGER NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id       INTEGER NOT NULL,
    variant_id       INTEGER,
    added_at         INTEGER NOT NULL DEFAULT (unixepoch()),
    UNIQUE(wishlist_id, product_id, variant_id)
  );

  -- ============================================================
  -- DOMAIN: MARKETING & PROMOTIONS
  -- ============================================================
  CREATE TABLE IF NOT EXISTS coupons (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    code             TEXT    NOT NULL UNIQUE,
    description      TEXT,
    discount_type    TEXT    NOT NULL CHECK(discount_type IN ('percentage','flat','free_shipping','bxgy')),
    discount_value   REAL    NOT NULL,
    max_discount_cap REAL,
    min_order_value  REAL    DEFAULT 0,
    applicable_to    TEXT    DEFAULT 'all',
    usage_limit      INTEGER,
    usage_per_user   INTEGER DEFAULT 1,
    used_count       INTEGER NOT NULL DEFAULT 0,
    start_at         INTEGER NOT NULL DEFAULT (unixepoch()),
    expires_at       INTEGER,
    is_active        INTEGER NOT NULL DEFAULT 1,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS coupon_usage (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    coupon_id        INTEGER NOT NULL REFERENCES coupons(id),
    user_id          INTEGER NOT NULL REFERENCES users(id),
    order_id         INTEGER NOT NULL,
    discount_applied REAL    NOT NULL,
    used_at          INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS flash_sales (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT    NOT NULL,
    slug             TEXT    NOT NULL UNIQUE,
    banner_url       TEXT,
    starts_at        INTEGER NOT NULL,
    ends_at          INTEGER NOT NULL,
    is_active        INTEGER DEFAULT 1,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS flash_sale_items (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id          INTEGER NOT NULL REFERENCES flash_sales(id) ON DELETE CASCADE,
    variant_id       INTEGER NOT NULL,
    sale_price       REAL    NOT NULL,
    original_price   REAL    NOT NULL,
    qty_limit        INTEGER,
    qty_sold         INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    txn_type         TEXT    NOT NULL CHECK(txn_type IN ('earn','redeem','expire','adjust')),
    points           INTEGER NOT NULL,
    balance_after    INTEGER NOT NULL,
    reference_type   TEXT,
    reference_id     INTEGER,
    description      TEXT,
    expires_at       INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: NOTIFICATIONS
  -- ============================================================
  CREATE TABLE IF NOT EXISTS notification_templates (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT    NOT NULL UNIQUE,
    event_type       TEXT    NOT NULL,
    channel          TEXT    NOT NULL CHECK(channel IN ('push','email','sms','whatsapp','in_app')),
    subject_template TEXT,
    body_template    TEXT    NOT NULL,
    locale           TEXT    DEFAULT 'en',
    is_active        INTEGER DEFAULT 1,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    template_id      INTEGER REFERENCES notification_templates(id),
    channel          TEXT    NOT NULL,
    title            TEXT,
    body             TEXT    NOT NULL,
    data             TEXT,   -- JSON
    deep_link        TEXT,
    status           TEXT    NOT NULL DEFAULT 'pending'
                                CHECK(status IN ('pending','sent','delivered','read','failed')),
    is_read          INTEGER DEFAULT 0,
    read_at          INTEGER,
    sent_at          INTEGER,
    failed_reason    TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS notification_preferences (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL UNIQUE REFERENCES users(id),
    push_enabled     INTEGER DEFAULT 1,
    email_enabled    INTEGER DEFAULT 1,
    sms_enabled      INTEGER DEFAULT 1,
    whatsapp_enabled INTEGER DEFAULT 0,
    order_updates    INTEGER DEFAULT 1,
    promotions       INTEGER DEFAULT 1,
    price_alerts     INTEGER DEFAULT 1,
    back_in_stock    INTEGER DEFAULT 1,
    quiet_hours_start TEXT,
    quiet_hours_end  TEXT,
    updated_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: RETURNS & REFUNDS
  -- ============================================================
  CREATE TABLE IF NOT EXISTS return_requests (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    return_number    TEXT    NOT NULL UNIQUE,
    order_id         INTEGER NOT NULL REFERENCES orders(id),
    user_id          INTEGER NOT NULL REFERENCES users(id),
    reason_code      TEXT    NOT NULL,
    reason_detail    TEXT,
    return_type      TEXT    NOT NULL CHECK(return_type IN ('return_refund','exchange','replacement')),
    status           TEXT    NOT NULL DEFAULT 'requested'
                                CHECK(status IN ('requested','approved','rejected','pickup_scheduled',
                                                 'picked_up','received','inspected','refund_initiated','closed')),
    approved_by      INTEGER,
    rejection_reason TEXT,
    pickup_scheduled_at INTEGER,
    received_at      INTEGER,
    inspection_notes TEXT,
    condition_on_receipt TEXT,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
    resolved_at      INTEGER
  );

  CREATE TABLE IF NOT EXISTS return_items (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    return_id        INTEGER NOT NULL REFERENCES return_requests(id) ON DELETE CASCADE,
    order_item_id    INTEGER NOT NULL REFERENCES order_items(id),
    quantity         INTEGER NOT NULL,
    refund_amount    REAL
  );

  CREATE TABLE IF NOT EXISTS refunds (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    return_id        INTEGER REFERENCES return_requests(id),
    order_id         INTEGER NOT NULL REFERENCES orders(id),
    user_id          INTEGER NOT NULL,
    refund_method    TEXT    NOT NULL CHECK(refund_method IN ('original_payment','wallet','bank_transfer','store_credit')),
    amount           REAL    NOT NULL,
    currency_code    TEXT    NOT NULL DEFAULT 'INR',
    status           TEXT    NOT NULL DEFAULT 'pending'
                                CHECK(status IN ('pending','processing','completed','failed')),
    gateway_refund_id TEXT,
    processed_at     INTEGER,
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS support_tickets (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_number    TEXT    NOT NULL UNIQUE,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    order_id         INTEGER,
    category         TEXT    NOT NULL,
    subject          TEXT    NOT NULL,
    status           TEXT    NOT NULL DEFAULT 'open'
                                CHECK(status IN ('open','pending','resolved','closed')),
    priority         TEXT    NOT NULL DEFAULT 'normal'
                                CHECK(priority IN ('low','normal','high','urgent')),
    assigned_to      INTEGER,
    resolved_at      INTEGER,
    satisfaction_score INTEGER CHECK(satisfaction_score BETWEEN 1 AND 5),
    created_at       INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- DOMAIN: ANALYTICS (lightweight aggregation tables)
  -- ============================================================
  CREATE TABLE IF NOT EXISTS analytics_daily_product (
    stat_date        TEXT    NOT NULL,
    product_id       INTEGER NOT NULL,
    views            INTEGER NOT NULL DEFAULT 0,
    unique_views     INTEGER NOT NULL DEFAULT 0,
    add_to_cart      INTEGER NOT NULL DEFAULT 0,
    purchases        INTEGER NOT NULL DEFAULT 0,
    revenue          REAL    NOT NULL DEFAULT 0,
    wishlist_adds    INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(stat_date, product_id)
  );

  CREATE TABLE IF NOT EXISTS analytics_daily_platform (
    stat_date        TEXT    PRIMARY KEY,
    total_sessions   INTEGER NOT NULL DEFAULT 0,
    unique_users     INTEGER NOT NULL DEFAULT 0,
    new_users        INTEGER NOT NULL DEFAULT 0,
    total_orders     INTEGER NOT NULL DEFAULT 0,
    gmv              REAL    NOT NULL DEFAULT 0,
    avg_order_value  REAL,
    cart_abandonment REAL,
    new_sellers      INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS search_queries_log (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER,
    session_id       TEXT,
    query_text       TEXT    NOT NULL,
    normalized_query TEXT,
    results_count    INTEGER,
    clicked_product  INTEGER,
    platform         TEXT,
    searched_at      INTEGER NOT NULL DEFAULT (unixepoch())
  );

  -- ============================================================
  -- INDEXES — SQLite-compatible
  -- ============================================================
  CREATE INDEX IF NOT EXISTS idx_users_email          ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_status         ON users(status, tier);
  CREATE INDEX IF NOT EXISTS idx_users_referral       ON users(referral_code);

  CREATE INDEX IF NOT EXISTS idx_addr_user            ON user_addresses(user_id, is_default);
  CREATE INDEX IF NOT EXISTS idx_sessions_user        ON user_sessions(user_id, is_active);
  CREATE INDEX IF NOT EXISTS idx_devices_user         ON user_devices(user_id);

  CREATE INDEX IF NOT EXISTS idx_cat_parent           ON categories(parent_id);
  CREATE INDEX IF NOT EXISTS idx_cat_slug             ON categories(slug);

  CREATE INDEX IF NOT EXISTS idx_prod_category        ON products(category_id, status);
  CREATE INDEX IF NOT EXISTS idx_prod_seller          ON products(seller_id, status);
  CREATE INDEX IF NOT EXISTS idx_prod_brand           ON products(brand_id);
  CREATE INDEX IF NOT EXISTS idx_prod_rating          ON products(avg_rating DESC, sold_count DESC);

  CREATE INDEX IF NOT EXISTS idx_variant_product      ON product_variants(product_id, is_active);
  CREATE INDEX IF NOT EXISTS idx_variant_sku          ON product_variants(sku);
  CREATE INDEX IF NOT EXISTS idx_images_product       ON product_images(product_id, display_order);
  CREATE INDEX IF NOT EXISTS idx_attrs_product        ON product_attributes(product_id);

  CREATE INDEX IF NOT EXISTS idx_inv_variant          ON inventory(variant_id);
  CREATE INDEX IF NOT EXISTS idx_inv_warehouse        ON inventory(warehouse_id);
  CREATE INDEX IF NOT EXISTS idx_invtxn_variant       ON inventory_transactions(variant_id, created_at DESC);

  CREATE INDEX IF NOT EXISTS idx_cart_user            ON carts(user_id, status);
  CREATE INDEX IF NOT EXISTS idx_cart_items_user      ON cart_items(user_id);
  CREATE INDEX IF NOT EXISTS idx_cart_items_product   ON cart_items(product_id);

  CREATE INDEX IF NOT EXISTS idx_orders_user          ON orders(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_orders_status        ON orders(status, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_oitems_order         ON order_items(order_id);
  CREATE INDEX IF NOT EXISTS idx_oitems_seller        ON order_items(seller_id, status);
  CREATE INDEX IF NOT EXISTS idx_ostatus_order        ON order_status_history(order_id, created_at DESC);

  CREATE INDEX IF NOT EXISTS idx_ptxn_order           ON payment_transactions(order_id, status);
  CREATE INDEX IF NOT EXISTS idx_ptxn_user            ON payment_transactions(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_ledger_wallet        ON wallet_ledger(wallet_id, created_at DESC);

  CREATE INDEX IF NOT EXISTS idx_ship_order           ON shipments(order_id);
  CREATE INDEX IF NOT EXISTS idx_ship_tracking        ON shipments(tracking_number);
  CREATE INDEX IF NOT EXISTS idx_track_ship           ON shipment_tracking_events(shipment_id, created_at DESC);

  CREATE INDEX IF NOT EXISTS idx_rev_product          ON product_reviews(product_id, status);
  CREATE INDEX IF NOT EXISTS idx_rev_user             ON product_reviews(user_id);

  CREATE INDEX IF NOT EXISTS idx_coupon_code          ON coupons(code, is_active);
  CREATE INDEX IF NOT EXISTS idx_cup_usage_user       ON coupon_usage(coupon_id, user_id);
  CREATE INDEX IF NOT EXISTS idx_loyalty_user         ON loyalty_transactions(user_id, created_at DESC);

  CREATE INDEX IF NOT EXISTS idx_notif_user           ON notifications(user_id, is_read, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_return_order         ON return_requests(order_id);
  CREATE INDEX IF NOT EXISTS idx_return_user          ON return_requests(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_refund_order         ON refunds(order_id);

  CREATE INDEX IF NOT EXISTS idx_search_text          ON search_queries_log(normalized_query, searched_at DESC);
  CREATE INDEX IF NOT EXISTS idx_adp_product          ON analytics_daily_product(product_id, stat_date DESC);
`);

console.log('[db.js] ✅ MNC-grade schema applied (all tables up to date)');

module.exports = db;
