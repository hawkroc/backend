# BLOCKEEPER
Labelling blockchain transactions.

## Framework
The current implementation of Blockeeper uses the MeteorJS framework, coupled with React templating and the Redux predicable state container. The local database is MongoDB managed by the meteor server.
* [Meteor introduction and documentation](http://docs.meteor.com/#/full/)
* [React overview and documentation](https://facebook.github.io/react/docs/hello-world.html)
* [Redux motivation and examples](http://redux.js.org/docs/introduction/)

## Development
Information for developers.
#### Running the solution
*  Clone the git repository to your local machine
```git clone <your-repo-url>.git```
*  In the root application directory, install the Meteor and NPM dependencies
```meteor npm install```
* Run the meteor backend and frontend
```meteor run```


#### Testing the solution
The project currently uses mocha + chai integrated with the meteor testing environment.

```npm run test```

This will run the meteor test environment. After the tests have run, results can be viewed in the browser at ```localhost:3000```. The test environment uses the same ports as ```meteor run``` so make sure to close that process first.

The tests run on an alternative instance of the MongoDB database so will not disrupt your development or staged data.