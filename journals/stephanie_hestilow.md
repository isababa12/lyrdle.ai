# Example Journal Entry

## July 9, 2021

Today, I worked on:

* Getting a customer's data for the account page
  with Asa

Asa and I wrote some SQL. We tested it out with
Insomnia and the UI. We had to coordinate with
Petra who was working on the GHI with Azami.

Today, I found the F2/Rename symbol functionality
in Visual Studio Code! It allows me to rename a
variable without causing bugs. I am going to be
using this a lot!

## July 7, 2021

Today, I worked on:

* Signing up a customer with Petra

Petra and I had a hard time figuring out the logic
for what happens when a customer signs up. We
finally came to the conclusion that not only did we
have to create the `User` record, but we also needed
to create associated preference records **and** had
to log them in.

Today, database transactions finally clicked. It
happened while we were trying to insert the
preferences for the customer. We had a bug in the
code, so the `User` record got created, but none
of the preferences. All of the inserts should
succeed or fail together. So, we used a transaction
to do that.
