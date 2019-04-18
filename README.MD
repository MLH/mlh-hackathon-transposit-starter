# Quick Start

* Visit your [Visit the Spotify Demo App!](https://spotify-demo-bsqf9.transposit.io/)

* Complete the [Transposit Quickstart Guide](http://hackp.ac/transposit-quickstart)

* View Available[Transposit Connectors](hackp.ac/transposit-connectors)

# Introduction

This is a hackathon boilerplate for a new Transposit application created by [Major League Hacking][mlh-github]. It is for hackers looking to get started quickly on a new hackathon project using the Transposit platform.

The [demo application](https://spotify-demo-bsqf9.transposit.io/) uses [Transposit's Spotify Connector](https://docs.transposit.com/connectors/spotify-documentation) to allow users to add a playlist to their Spotify account.

**What is Transposit?**

Transposit is the world's first API composition platform. Transposit provides an interactive interface that gives hackers a quick and effortless way to connect different APIs together using SQL or JavaScript. They offer various web connectors for platforms like Giphy, Twilio, Slack and 

**Why should I use Transposit?**



## Prerequisites

This project requires the following tools:

- Transposit Account
- Transposit SDK

To get started, install NPM on your local computer if you don't have them already.

## Getting Started

**Step 1. Create a Transposit Account**

Open [Transposit](http://hackp.ac/transposit-login) and create an account. You may be required to use a Google account to sign-up.


**Step 2. Create an Application .**

Once your account is created, create a new application by hitting "New Application" button. 

(picture)

Name your application whatever you like, since we are creating a Spotify Demo app we will name it `spotify_demo` and hit "Create". This will create a new application where you can develop an endpoint or webhook to use in your app. 

(picture)


**Step 3. Add a Data Connection**

When a new application is created in Transposit the next step is to add a Data Connection that will leverage one of the many Transposit [Data Connectors](hackp.ac/transposit-connectors) that are available. You can add as many data connectors as you like, even from different types of APIs. Hit the `+` symbol located next to "Data Connections" to add a new connection.

(picture)

You will be promoted to select one of the Data Connectors available in Transposit, we're going to select "Spotify" and under connection add the `create_playlist` operation.

(picture)

Transposit does a really good job at making the connection to different APIs a seamless process. Transposit will handle for you the complexities of authentication, retries, caching, and optimized execution. Your web application can interact with Transposit through a JavaScript client or plain HTTP. 

You will be prompted to add a key to the application, simply just hit "Authorize" to add an the API key. You should now have an application that looks like the screenshot below with code template provided for the `create_playlist` operation.

(picture)




**Step 4. Editing the Create Playlist Code**

Transposit speeds up the process of connecting to API endpoints that you would normally have to code on your own. With Transposit's relational engine, you can use SQL and JavaScript to join, filter and transform your data, wherever it lives, in an interactive interface. You can almost think of Transposit as an interactive API. Let's take a look at the code template for the `create_playlist` operation.

```sql
SELECT * FROM spotify.create_playlist
  WHERE user_id='<required_string>'
  AND $body=(SELECT {
    'public' : <boolean>,
    'name' : '<required_string>'
  })
```

This code pulls in the Spotify API endpoint for the `create_playlist` operation. If you're curious you can view the [API Reference in the Spotify Documentation](https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/) to see that it's a leveraging the same parameters.

You also notice that the operation is using SQL instead your classic JavaScript, since Transposit is a relational engine it leverages SQL heavily when creating end points, however it's perfectly fine to create webhooks using JavaScript, you can take a look at [Transposits quick start guide](http://hackp.ac/transposit-quickstart) to see how to do this.

Let's update the code to allow users to create a Playlist. The only parameters we have to change is the `user_id`, `public`, and `name`. 

```sql
SELECT * FROM spotify.create_playlist
  WHERE user_id=@user_id
  AND $body=(SELECT {
    'public' : true,
    'name' : 'My Hackathon Playlist'
  })
```
Here's what we changd:

* `user_id` = `@user_id`
* `public` = `true`
* `name` = 'My Hackathon Playlist'

We've added a `user_id` variable to allow users to sign-in to their own Spotify accounts to add a playlist. In order for this to work we need to add a parameter to our app for `user_id`. Transposit makes this pretty simple. With your code open, hit "Add Parameter" on the right-hand side, and for the name enter `user_id`. You can leave the default value blank.

(picture)

We now have a variable that can be used as a parameter when calling our operation. Add your Spotify user name to the text box under the parameter we just created so we can test our operation. 

(picture)

Hit the "Run" button towards the top of the app with the Results tab open, you should get a successful reponse from the Application. If you open your Spotify app you should see the "My Hackathon Playlist"!


(playlist)



**Step 5. Deploying the Connector **

Now that we have our fancy connector ready, it's time to deploy it so we can use it within our app. Select the Rocket icon on the left hand side to access the deployment menu.

(picture)


Here we can choose to deploy the end points we have available. The "Endpoints" menu should already be open with the available operations we can deploy. By default, the `hello_world` end point will be deployed, go ahead and set it to `not deployed` using the drop-down menu. Set the operation we created to `deployed`. Once deployed check off the box that reads "Require User Sign-In" and hit Save.

(picture)

You'll notice that Transposit will ask for a production key. Up until this point we have created our operation using a development key from Spotify. To add a production key simply select the link that reads "production keys"

(picture)

Simalarly to how we added a development key before, hit "Add Key" this will prompt you to add a production key. Hit authorize to add a Spotify Production key. You're endpoint should now officially be deployed! 

# Where to go next

Once your end point is ready it's time to call it in your application. You can follow the steps in the [Transposit JavaScript SDK](https://github.com/transposit/transposit-js-sdk) to add it to your web application.

The Transposit SDK allows you to 

* Call endpoints: Call your backend through an idiomatic library.
* Require sign-in: Ask users to sign in before interacting with your web app.
* Manage authentication: Allow users to grant access to their third-party data.

The only block of code you need to call your operation is the following:

## Call endpoints

Call your backend through an idiomatic library.

```javascript
transposit
  .runOperation("myOperation")
  .then(response => {
    if (response.status !== "SUCCESS") {
      throw response;
    }
    const results = response.result.results;
  })
  .catch(response => {
    console.log(response);
  });
  ```



# Sample Applications

Coming Soon

# Structure

Coming Soon


# Resources

Coming Soon


# Code of Conduct

We enforce a Code of Conduct for all maintainers and contributors of this Guide. Read more in [CONDUCT.md][mlh-conduct].

# License

The Hackathon Starter Kit is open source software [licensed as MIT][mlh-license].

[mlh-github]: https://github.com/jekyll/jekyll/blob/master/CONDUCT.markdown
[mlh-conduct]: https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/docs/CONDUCT.md
[mlh-license]: https://github.com/MLH/mlh-hackathon-nodejs-starter/blob/master/LICENSE.md
