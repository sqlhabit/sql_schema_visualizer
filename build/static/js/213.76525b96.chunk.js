"use strict";(self.webpackChunksql_schema_visualizer=self.webpackChunksql_schema_visualizer||[]).push([[213],{4213:function(e,t,a){a.r(t),a.d(t,{default:function(){return i}});var i=[JSON.parse('{"name":"carts","description":"This table contains all carts (purchased or not) that were ever assembled by users.","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a cart.","type":"bigint"},{"name":"user_id","description":"ID of a user who assemled a cart.","type":"bigint"},{"name":"created_at","description":"When a cart was created (when a user added the first item to a cart).","type":"timestamp"}]}'),JSON.parse('{"name":"carts_items","description":"This is a join table that enables many-to-many relation between carts and items.","schemaColor":"#91C4F2","columns":[{"name":"item_id","description":"ID of an item that was added to a cart.","type":"bigint"},{"name":"cart_id","description":"Cart\'s ID.","type":"bigint"},{"name":"created_at","description":"When an item was added to a cart.","type":"timestamp"},{"name":"quantity","description":"How many identical items are in a cart.","type":"integer"}]}'),JSON.parse('{"name":"categories","description":"This table contains item categories. Note that cateories are nested and a category could have multiple children categories.","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of an item category.","type":"bigint"},{"name":"name","description":"Category name, like \\"Sport shoes\\".","type":"text"},{"name":"parent_id","description":"ID of a parent category. Yep, categories have nested structure. For example, \\"books\\" category have \\"fiction\\" and \\"non-fiction\\" categories. \\"Fiction\\" category has categories like \\"History\\", \\"Detective\\", etc.","type":"bigint"},{"name":"created_at","description":"When a category was added.","type":"timestamp"}]}'),JSON.parse('{"name":"discount_codes","description":"Thsi table contains all discount codes that could be redeemed by a user when making a purchase. Note that discount codes could save a fixed amount or a percentage of the final price.","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a discount code.","type":"bigint"},{"name":"amount_off","description":"Amount in USD that will be subtracted from a total cart\'s price if a user redeems this discount code.","type":"bigint"},{"name":"percent_off","description":"Percentage of a total cart\'s price that will be removed if a user redeems this discount code.","type":"bigint"},{"name":"code","description":"Unique code of a discount code. Codes are shared with customers, not ID-s :warning:.","type":"text"},{"name":"created_at","description":"When discount code was created.","type":"timestamp"},{"name":"valid_until","description":"The latest timestamp when customers are able to redeem a discount code.","type":"timestamp"}]}'),JSON.parse('{"name":"items","description":"This table contains all items that could be purchased by users. Note that only published items are available to website visitors (have value in the `published_at` column).","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of an item.","type":"bigint"},{"name":"name","description":"Item\'s name.","type":"text"},{"name":"category_id","description":"ID of item\'s category.","type":"bigint"},{"name":"vendor_id","description":"ID of a vendor who produces or sells this item in our E-commerce store.","type":"bigint"},{"name":"price_usd","description":"Item\'s price in USD.","type":"numeric"},{"name":"created_at","description":"Timestamp when an item was first added to our E-commerce store.","type":"timestamp"},{"name":"published_at","description":"Timestamp when an item was first available for purchasing.","type":"timestamp"}]}'),JSON.parse('{"name":"purchases","description":"This table contains all cart purchases.","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a return.","type":"bigint"},{"name":"discount_code","description":"Discount code that was used by a user. It\'s a foreign key for the `discount_codes` table.","type":"text"},{"name":"country","description":"Country of a user who made a purchase (IP based).","type":"text"},{"name":"city","description":"City of a user who made a purchase (IP based).","type":"text"},{"name":"payment_method","description":"Payment method that was used for a purchase. Could be **cc** (credit card) or **paypal**.","type":"text"},{"name":"created_at","description":"Timestamp of a purchase.","type":"timestamp"},{"name":"cart_id","description":"ID of a cart that was purchased.","type":"bigint"}]}'),JSON.parse('{"name":"returns","description":"This table contains all returns (full carts or partial item returns).","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a return.","type":"bigint"},{"name":"cart_id","description":"ID of a cart that a retuned item belongs to. In our E-commerce store users add items to a cart, then purchase the whole cart. Users are allowed to return as many items from a purchased cart as they want.","type":"bigint"},{"name":"item_id","description":"ID of an item that was returned.","type":"bigint"},{"name":"quantity","description":"How many items were returned.","type":"integer"},{"name":"created_at","description":"Timestamp when a return was processed.","type":"timestamp"}]}'),JSON.parse('{"name":"reviews","description":"This table contains all user reviews for individual items.","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a review.","type":"bigint"},{"name":"item_id","description":"ID of an item that was reviewed.","type":"bigint"},{"name":"user_id","description":"ID of a user who left a review.","type":"bigint"},{"name":"rating","description":"Star rating that a user selected in a review form.","type":"integer"},{"name":"created_at","description":"Timestamp when a user left a review.","type":"timestamp"},{"name":"feedback","description":"Text feedback that a user types in a review form.","type":"text"}]}'),JSON.parse('{"name":"users","description":"This table contains all user records (accounts).","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a user.","type":"bigint"},{"name":"email","description":"User\'s email.","type":"text"},{"name":"first_name","description":"User\'s first name.","type":"text"},{"name":"last_name","description":"User\'s last name.","type":"text"},{"name":"country","description":"User\'s country (IP based).","type":"text"},{"name":"city","description":"User\'s city (IP based).","type":"text"},{"name":"created_at","description":"Timestamp when a user created an account.","type":"timestamp"}]}'),JSON.parse('{"name":"vendors","description":"This table contains all vendors (people or companies that sell items on our E-commerce platform).","schemaColor":"#91C4F2","columns":[{"name":"id","key":true,"description":"Unique identifier of a vendor.","type":"bigint"},{"name":"name","description":"Vendor\'s name (person or company name).","type":"text"},{"name":"created_at","description":"Timestamp when a vendor started working with our E-commerce store.","type":"timestamp"}]}')]}}]);
//# sourceMappingURL=213.76525b96.chunk.js.map