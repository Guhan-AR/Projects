def letter_counter(sentence):
    c=0
    for i in sentence:
        if i==" ":
            continue
        else:
            c+=1
    return c
def word_counter():
    s=list(map(str,input().split()))
    print(s)
    return len(s)
def word_repitition():
    sentence = list(map(str,input().split()))
    frequency={}
    for i in sentence:
        n_r=0
        if i in frequency:
            frequency[i]+=1
            n_r=1
        else:
            frequency[i]=1
    if n_r==0:
        return "No Repitition"
    return frequency
# print(word_repitition())
def diwali_carcker_prices_addition():
    a=str(input())
    res=0
    for i in range(len(a)):
        if a[i]=='[':
            i+=1
            b=int(a[i])
            i+=1
            while a[i]!=']':
                b*=10
                b+=int(a[i])
                i+=1
            res+=b
            print(b,end="\n")
    print('=',res)
diwali_carcker_prices_addition()