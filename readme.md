MEAN Store:

Objective: Create a restful API using Express to create a store:

2. Dashboard Link:

	+ Show Recent Orders (and show more...)
	+ Remaining Issue: Set so date is shown in comparison to present.
	+ Remaining Issue: Search box.

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

	+ Remaining Issue: Need to add 'ordinal date' functionality.
	+ Remaining Issue: Search box.

5. Products Link:

	+ Remaining Issue: Filter box use ng-filter
	+ Remaining Issue: Show More button


# Let's start with a few questions:

	+ What routing do we want?
		put `/customers` for customer creation
		get `/customers` to retrieve all customers
		delete `/customers/:id` for customer deletion?
		put `/products` for product creation
		get `/products` to retrieve all products
		put `/orders` for order creation
		get `/orders` to retrieve all orders
	+ Order Model:
		+ customer ID: objectID
		+ quantity: Number
		+ `products` ID array: empty array holding products objectIDs
