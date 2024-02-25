starting from the top and working my way down
**App.js
    * import the needed things - useState to create state - useEffect to help the page update when the user changes something without updating the whole page.
    * import components needed, the JoblyApi, bootstrap, and css file

    *create functional componant App - set up the state for the user and make it an empty object
    *store the userData in the user state - we do this by calling getUser from the api file --- 

        *getUser() takes a username - there is a try/catch block - set results to a promise and await this.request from /users/usernameand return the result

    and setting that promise to res(ults) - then we take the setUser state and collect the results.user, and set the token: JoblyApi.token

    *create a useEffect and localStorage method .getItem() to grab the username and token if they are within the localStorage. IF they are both there we set JoblyApi.token to token and getUser is called using this username --- if one or both are missing we set the token to an empty string

    *LOGIN METHOD --- update localStorage, token and state with our logIn method - This method takes the data in and set localStorage username and token using the data.username and data.token respectively --- set JoblyApi.token - data -- call getUser using the username

    *LOGOUT METHOD --- take the same data we had prior but basically do the opposite - we clear the localStorage of the user information, we set the JoblyApi.token to an empty string, we set the user state back to empty {} object

    *APPLY METHOD --- async function that we are waiting for promise back from the JoblyApi - it takes the jobId, and uses a try catch for error control - set res(ults) to the await applyForJob() from API using the username and jobId

        *applyForJob() takes username and jobId - another try and catch block here - setting the res(ults) to this.request /users/username/jobs/jobid --- this is a POST and will return either a result or an error

    our return is the single <div> and everything in here is going to be wrapped in the userContext so we can share/consume values within the component tree
        * first part is BrowserRouter with our NavBar component passing logOut to child
        *Next we have our routes 
            *each has a path and a element that holds a component and any props to pass to the children - some of these are doubled up (login, getUser, apply) because these are reusuable methods to help minimize the code in future components


**NavBar.js
    *import the things that we need from react (useContext manages state globaly), (NavLink is a special kind of link that knows active, pending or transition), Nav items from reactstrap, our css and bootstrap - and our userContext from our userContext.js file    

    The only method sent down from App was logOut so we put that into the function. We grab the token and username from the userContext using useContext

    *Next we have an if else
    *If there is a token - show one nav bar generated for the specific user 
    *else provide the generic navbar where someone can login or sign up

**LoginForm.js
    * using Form items from reactstrap - state from React - useNavigate from react router dom
    *import our API and our css

    *create function called LoginForm - takes logIn prop from App.js parent component
    *create state from fromData setting username and password to empty strings
    *set navigate variable to the useNavigate() method for easier user

    *methods for use:
        *login - async func calling to the API using loginUser() and the formData state -
            
            *loginUser(data) - try and catch block where we set the res(ults) to this.request at url auth/token using the collected data

            *auth/token on the backend is a POST route - async function that takes a request result and next - this is basically where we validate the user information - 
                *if not valid - map the errors and throw badrequest
                *grab the username and password from request body
                set user to User.authenticate 

                    *User.js in backend Models folder - 
                    *authenticate() takes a username and password ---async function that is looking for a database query and setting the first result to user - if user is there that is where we encrypt their password and compare - if THAT is valid we return just the user without the password - 

                * set token using the createToken() from /helpers/token.js

                    * helper function that takes a user (just made through authenticate()) - checks is user has an isAdmin and sets payload to an object that holds the user.username and isadmin (as true or false) and returning the jwt.sign() using the payload and our secret key 

                * and then we return the response.json token or an error
        
        *handleChange() takes an event aka changes that the user is making - we want to target the values and update appropriately 
            *in the target where the event is taking place we want to grab the name and value and set the state 
            *setDataForm takes data and collects the previously collected data and uses the name and value as a key value pair
        
        *handleSubmit() takes an event aka the button push
            *first, we prevent default on the event
            *next, we call login() that we just defined above
            *set state so that the username and password are back to empty strings

        return a single div where we:
            *call handleSubmit on the Forms onSubmit
            *Label for Username and Passwords
            *inputs for username and password - both which use the handleChange we defined above 

*CompanyList.js 
    *import same things - useState, useEffect, Reacct
    *grab out companyCard, API and the css for this file

    *start CompanyList function/component - this is the child of App.js
    *set State for the companies - beginning state is null

    *on changes to the page we want to useEffect - an async function called fetchCompanies() --- try and catch 
    *set companyData to the API getCompanies() method

        *getCompanies()requires a handle to be passed in and we try/catch --- set the res(ults) to this.request at the companies/ url
            
            *GET companies from routes folder - that takes req, res and next - 
            try and catch block that maps all found companies using the .findAll() method from the Company Models

                *findAll() is a async func - sets up the query and returns companiesRes.rows

            returns response.json of companies or errors

        setState to the companies response then call fetchCompanies() outside of the async func

    *return a single div filled with a map of company cards

*CompanyCard.js
    *Our babiest of components in this list - receives the company information from the parent CompanyList component
    *no methods or anything crazy here --- just returning a component card for each company


****go over navbar and company tests to complete before Monday

            