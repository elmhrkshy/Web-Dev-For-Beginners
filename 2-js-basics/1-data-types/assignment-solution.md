# Data Types Practice — Shopping Cart Solutions

This document provides beginner-friendly explanations and working JavaScript examples showing how each JavaScript data type is used in a realistic e-commerce shopping cart application.

## String

**Purpose in Shopping Cart:** Product names, descriptions, user names, email addresses, coupon codes.

**Why This Type:** Strings are sequences of characters; they are perfect for textual data and identifiers that are shown to users or used as keys.

**Code Example:**
```javascript
// Product title and description
const productName = "Wireless Headphones";
const productDescription = `High-fidelity wireless headphones with active noise cancellation.`;

// User information
const userFullName = "Ava Johnson";
const userEmail = "ava@example.com";

console.log(`${userFullName} added ${productName} to the cart.`);
```

**Real-world Usage:** Product pages use strings for titles and descriptions. Strings are also used for display, search queries, and storing non-numeric identifiers such as SKU codes.

**Interactions:** Strings are often used with numbers (prices) when formatted for display, or as object properties (product.name). They are converted to/from numbers for calculations (e.g., parseFloat on price strings from user input).

---

## Number

**Purpose in Shopping Cart:** Prices, quantities, subtotal, tax, shipping cost, discounts (percent values), calculations.

**Why This Type:** Number is a built-in numeric type that supports arithmetic operations. For typical currency math with cents, JS Number often works, but be careful with floating-point precision.

**Code Example:**
```javascript
const unitPrice = 49.99; // USD
let quantity = 2;

const subtotal = unitPrice * quantity; // 99.98
const taxRate = 0.07; // 7%
const tax = subtotal * taxRate; // 6.9986
const total = subtotal + tax;

console.log({ subtotal: subtotal.toFixed(2), tax: tax.toFixed(2), total: total.toFixed(2) });
```

**Real-world Usage:** Pricing calculations, totals on the checkout page, inventory counts. In production, it's common to store money as integers (cents) or use libraries (e.g., decimal.js) to avoid precision issues.

**Interactions:** Numbers interact with strings (formatting) and objects (cart.total). They must be validated (Number.isFinite) when accepting user-provided quantities.

---

## Boolean

**Purpose in Shopping Cart:** Flags like item availability (inStock), whether the cart is checked out (isCheckedOut), user preferences (saveForLater), or whether a coupon is applied.

**Why This Type:** Booleans clearly represent binary states and simplify control flow (if statements, toggles).

**Code Example:**
```javascript
const isInStock = true;
let isGift = false;

if (!isInStock) {
  console.log('Item is out of stock — disable Add to Cart button.');
}

// toggle wishlist preference
let savedForLater = false;
savedForLater = !savedForLater; // switch true/false
```

**Real-world Usage:** UI elements enable/disable based on Booleans. Server logic checks flags (e.g., isActive, isAdmin) to permit actions.

**Interactions:** Booleans interact with objects and strings when serializing state (e.g., sending isGift in JSON) and with numbers in some coercions (true -> 1 in numeric contexts).

---

## Null

**Purpose in Shopping Cart:** Intentionally empty values where a value is absent by design — for example, no coupon applied, no selected shipping address yet.

**Why This Type:** Null is explicitly set by the programmer to indicate "no value" rather than "not provided". It’s useful for intentionally empty fields.

**Code Example:**
```javascript
let appliedCoupon = null; // user has not entered a coupon
let selectedShippingAddress = null;

if (appliedCoupon === null) {
  console.log('No coupon applied.');
}
```

**Real-world Usage:** Distinguish between a value intentionally cleared (null) vs not fetched (undefined). When serializing to APIs, null often indicates an explicit empty value.

**Interactions:** When reading from an API, null is often assigned to object properties (order.coupon = null). Code must guard against null before accessing nested properties.

---

## Undefined

**Purpose in Shopping Cart:** Represents uninitialized variables or missing object properties (e.g., cart.discountCode is undefined if not present from API payload).

**Why This Type:** Undefined is the default state for a variable that has been declared but not assigned; it helps detect missing data or initialization mistakes.

**Code Example:**
```javascript
let promoCode; // undefined

const cart = { items: [] };
console.log(cart.discountCode); // undefined

if (typeof promoCode === 'undefined') {
  console.log('Promo code not set yet.');
}
```

**Real-world Usage:** Often encountered when reading incomplete user input or poorly shaped API responses. Code should check for undefined and provide defaults.

**Interactions:** Undefined vs null: use null when you intentionally clear a value; undefined usually means "not set". When serializing, undefined fields may be dropped by JSON.stringify.

---

## Symbol

**Purpose in Shopping Cart:** Create unique keys for internal metadata, to avoid property name collisions when extending objects (advanced use).

**Why This Type:** Symbols are unique and non-enumerable by default; they’re useful for adding private or library-specific metadata to objects without risking key collisions.

**Code Example:**
```javascript
const internalId = Symbol('internalId');

const product = {
  id: 'prod_123',
  name: 'USB-C Charger',
};

// attach internal data without affecting JSON output
product[internalId] = { importedAt: Date.now() };

console.log(Object.keys(product)); // ['id', 'name'] — symbol not listed
console.log(product[internalId]); // { importedAt: 1690000000000 }
```

**Real-world Usage:** Libraries or frameworks can use Symbols to store internal flags (e.g., caching meta) on objects without exposing them in iteration or accidental overwrites.

**Interactions:** Symbols do not appear in typical loops (for...in, Object.keys) and are not serialized by JSON.stringify, but you can access them directly when needed.

---

## BigInt

**Purpose in Shopping Cart:** Handle very large integer calculations beyond Number.MAX_SAFE_INTEGER, e.g., cumulative analytics counts across massive datasets or dealing with precise integer-based money in edge cases.

**Why This Type:** BigInt can represent integers larger than 2^53 - 1 safely without losing precision.

**Code Example:**
```javascript
// Suppose you keep cumulative loyalty points across many users
const totalLoyaltyPoints = 9007199254740995n; // BigInt literal with `n`
const newPoints = 100n;
const newTotal = totalLoyaltyPoints + newPoints;
console.log(newTotal); // 9007199254741095n
```

**Real-world Usage:** Rare in typical shopping cart apps, but useful for backend analytics counters, unique identifiers requiring large integer arithmetic, or when interfacing with databases that return big integers.

**Interactions:** BigInt cannot be mixed directly with Number in arithmetic — convert explicitly (Number(bigInt) or BigInt(number)) and be cautious about precision losses.

---

## Object

**Purpose in Shopping Cart:** The core structure for product details, user profiles, shipping information, and the cart itself.

**Why This Type:** Objects model real-world entities with named properties and nested structures.

**Code Example:**
```javascript
const product = {
  id: 'prod_001',
  name: 'Smart Watch',
  price: 199.99,
  inStock: true,
  variants: [
    { color: 'black', sku: 'sw-black' },
    { color: 'silver', sku: 'sw-silver' }
  ]
};

const cartItem = {
  productId: product.id,
  selectedVariant: product.variants[0],
  quantity: 1,
};

const cart = {
  items: [cartItem],
  currency: 'USD',
  createdAt: new Date().toISOString(),
};

console.log(cart);
```

**Real-world Usage:** Objects represent structured data exchanged with APIs and stored in application state (Redux, Vuex) or databases.

**Interactions:** Objects frequently nest arrays and primitives. Methods on objects (functions) can compute derived values (e.g., cart.total) using numbers, booleans, and arrays.

---

## Array

**Purpose in Shopping Cart:** Ordered collections — list of products, cart items, search results, order history.

**Why This Type:** Arrays offer ordered storage and many useful methods (map, filter, reduce) for common operations like computing totals or filtering available items.

**Code Example:**
```javascript
const cartItems = [
  { productId: 'prod_001', price: 199.99, quantity: 1 },
  { productId: 'prod_002', price: 49.99, quantity: 2 }
];

// compute cart total using array.reduce
const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
console.log(total.toFixed(2)); // 299.97
```

**Real-world Usage:** Arrays are used to show product lists, iterate over cart items during checkout, and store order events.

**Interactions:** Arrays contain objects and primitives and are commonly transformed into different shapes (e.g., filter out-of-stock items, map to line items for API calls).

---

# Bonus Challenges

## 1) Type Coercion

**Example:** When you receive quantity as a string from an input element and add it to a number.

```javascript
const qtyFromInput = '5'; // string from <input>
const existingItems = 10;

// JS will coerce if you use + with both strings: '5' + 10 -> '510'
console.log(qtyFromInput + existingItems); // '510' (unexpected)

// Correct approach: convert before arithmetic
const totalItems = Number(qtyFromInput) + existingItems; // 15
console.log(totalItems);
```

This demonstrates why explicit conversion is important to avoid unexpected string concatenation.

## 2) Data Validation

**Example:** Validate a user's quantity input and price before processing.

```javascript
function validateQuantity(q) {
  // Accept numbers or numeric strings but ensure they produce a safe integer quantity
  const n = Number(q);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) {
    return { valid: false, reason: 'Quantity must be a non-negative integer' };
  }
  return { valid: true, value: n };
}

console.log(validateQuantity('2')); // { valid: true, value: 2 }
console.log(validateQuantity('2.5')); // invalid
console.log(validateQuantity('-1')); // invalid
```

Also validate price inputs:
```javascript
function validatePrice(p) {
  const n = Number(p);
  if (!Number.isFinite(n) || n < 0) {
    return { valid: false, reason: 'Price must be a non-negative number' };
  }
  return { valid: true, value: n };
}
```

## 3) Performance Considerations

- Prefer storing money as integers (cents) to avoid floating point problems and to allow faster integer math. Example: store 19999 (cents) instead of 199.99.
- Use arrays of primitives when you need flat lists for fast iteration; nested objects are fine when you need rich structure but may be slower to clone.
- Avoid excessive deep cloning of objects; use immutable updates carefully (shallow clones when possible) to keep performance.
- Use Symbols sparingly — they are useful, but enumerating them requires Object.getOwnPropertySymbols which can be slower.

---

# Final Notes & Best Practices

- Distinguish when to use null (intentional absence) vs undefined (not set).
- Avoid mixing BigInt and Number without explicit conversion.
- Always validate data coming from user inputs or external APIs.
- Consider using utility libraries (e.g., decimal.js, Big.js) for precise currency calculations if your application requires high precision.

Happy coding — try the examples in your browser console or Node.js to see them in action!