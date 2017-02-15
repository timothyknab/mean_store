#MEAN Store:

##Objective:

+ Create a restful API using Express to create a store:

##Development Issues Experienced Log:

1. Search Box: How do we create this?

		*Solution*
		(1) Place an `ng-model={{modelName}}` onto an input field.
		(2) In your `ng-repeat`, add `| filter: {{modelName}}`.
		(3) Your input field will now Search:

			`<form>
				<input type="text" ng-model="mySearch">
			</form>

		 	<div ng-repeat="customer in customers | filter: mySearch">
				<!-- repeated contents which can now be searched -->
			</div>`

2. "Time ago", ie "3 minutes ago" display:

		*Solution* Use momentJS. Add the script tag to your index/html pages
		Then, use the moment functions to manipulate the data handed back
		from the back end. You can use moment on the back end too, but this
		would require modifying our actual objects, which we don't want to do.

		Website: http://momentjs.com/docs/#/use-it/browser/

		Here's the function I used:

			`// Convert Time:
			$scope.timeAgo = function(array) {
				for (var i = 0; i < array.length; i++) {
					array[i].fromNow = moment(array[i].createdAt).fromNow();
				};
				console.log(array);
				return array;
			};`
