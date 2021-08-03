# RESTful API Blanja! v1
This is a repository for my project at Arkademy Fullstack Web Developer Bootcamp. In this project i created a RESTful API and backend for the e-commerce site that i slice and make.
## Instruction
Each table have its own method to use. In this section i will describe what methods can be used on each table.

### Method
Method that can be use is listed here
    1. GET
    2. POST
    3. PUT
    4. DELETE
    
For GET method, you can use pagination, searching keyword, sorting based on which column you choose from the database.  To use pagination, you can apply value to **limit** and **page** key, for searching you can apply value to **search** and **keyword** key, for sorting you can apply value to **column** and **sort** key. You can see key name, what kind of value to use, and description each key in table below.
|Key |Value|Description|
|----------------|-------------------------------|-----------------------------|
|page|`Number`| Which page you want to see |
|limit|`Number`|How much item you want to see|
|search|`String`|Which category you want to see|
|keyword|`String`|What keyword you want to search|
|sort|`ASC/DESC`|What kind of sorting you want to use, you can use ASC value for **ascending** and DESC for **descending**|
|column|`String`|which column you want to sort, i.e. name, price, etc.|

### Login and Register
You need to login to use method (except GET Product) in this site. If you didnt have account, you can register. Registering already use **hashing bcrypt** for password hashing. If you already have an acc, you can login. Everytime you login, a token is generate using **JSON Web Token** that can be use for 24 hour.
### Redis
For caching, i already used redis to test.
