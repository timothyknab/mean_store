MEAN Store:

Objective: Create a restful API using Express to create a store:

1. Index Partial Navigation:

	+ Dashboard
	+ Products
	+ Orders
	+ Customers
	+ Settings

2. Dashboard Link:

	+ Search box on left (filter box)
	+ Show products (and show more...)
	+ Show Recent Orders (and show more...)
	+ Show New Customers (and show more...)

3. Orders Link:

	+ Add a new order form
	+ Form contains:
		+ Customers Dropdown
		+ Order # Dropdown
		+ Product Dropdown
	+ Order Button
	+ Table containing:
		+ Customer name
		+ Product Ordered
		+ Quantity Ordered
		+ Date Ordered
		+ Filter Box use ng-filter

4. Customers Link:

	+ Add new customer Form
	+ Form contains:
		+ customer name
		+ add Button
		+ validations for existing user
	+ Table containing:
		+ customer name
		+ date customer created
		+ actions (delete button)
		+ filter box use ng-filter

5. Products Link:

	+ Shows all products and quantity left
	+ Shows add new product Form (show more...)
	+ Form contains:
		+ name of  new products
		+ image URL
		+ product description
		+ quantity Ordered
		+ create Button
	+ Filter box use ng-filter


# Let's start with a few questions:

	+ How many forms do you need total? 	
		Answer: 3 (1 for customer, 1 for order, 1 for product)
	+ Which form should you create first?
		Answer: Products -> then Customers -> then Orders (you can't make an order without a product or a customer)
	+ How many partials do you need total?
		Answer: 4 including index partial (index partial, #!orders, #!customers, #!products -- and root index so 5 total pages but only 4 are partial)
	+ How many Angular Controllers then?
		Answer: 4 controllers: 1 for dashboard, 1 for orders page, 1 for customers page, 1 for products page
	+ How many Angular Factories then?
		Answer: 4 factories: 1 for dashboard, 1 for orders, 1 for customers, 1 for products
	+ How many Server Controllers then?
		Answer: 3: 1 to query orders, 1 to query customers, 1 to query products
	+ How many schemas?
		Answer: 3 (1 for customers, 1 for orders, 1 for products)
	+ What routing do we want?
		put `/customers` for customer creation
		get `/customers` to retrieve all customers
		delete `/customers/:id` for customer deletion?
		put `/products` for product creation
		get `/products` to retrieve all products
		put `/orders` for order creation
		get `/orders` to retrieve all orders
	+ Customer model:
		+ name : String
		+ createdAt : auto
		+ updatedAt : auto
		+ `orders` ID array : empty array holding orders objectIDs
	+ Product Model:
		+ name: String
		+ image: String (?)
		+ description: String
		+ quantity: Number
	+ Order Model:
		+ customer ID: objectID
		+ quantity: Number
		+ `products` ID array: empty array holding products objectIDs
