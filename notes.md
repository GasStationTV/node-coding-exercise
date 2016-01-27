## Notes:


#### Timezones and Open 24Hr:
* I deliberately kept the time formatting simple. It takes one moment method on the FE to display properly. Also, based on the validations information, the FE is responsible for a dropdown containing 30 min increments. Once passed to BE, everything is handled.
* Because time is a Number held in a string, it is easily comparable, and can easily be cross referenced for Timezones.  If(timezone === 'MST'){timeslot - 2} Moment can also handle it.

#### The Validate Object Library
* The validate object can take any number of specific validation functions
 Here, it is contrived, so many of them need very similar validations.
However, in the future, it can easily be extended to be as robust as needed.
 I'm using very similar functions for now, but each can be extended to
parse or format the data properly..email,phone,etc

#### Update
* Currently I am using the .update() method as the default for several reasons. In order for all or any of the fields to validate, they are processed through the validateBody() function.
It would seem redundant and unnecessary to create another version just for update.
* The other patch endpoint, with $set, is there, but only so that it can be extended if the team deems it worthy.  There are no unique fields which could, after validating, be duplicated.
* The only async call that COULD be needed, would be ADDRESS.  It is the only unique identifier, as of now, that could determine duplicate documents.  However, that's another issue for the team to discuss, client side form standardization would need to be in place.  *IMPORTANT*: duplicated code for now in "UPDATE" case of validateBody(). Depending on how the team decides to move forward, async can be added.


#### My reasoning behind the `validateBody()` method:
 A. It is safe to use JSON Format

 B. I have formed the structure of the cases around my Data Model.
 However, with the switch case, it can be
 extended (indefinitely) or modified (once)
 easily to suit the needs of another data model. I am trying to
 maintain flexibility and openness to futures needs. If this Model
 were to be used, for example, it would take only a couple of minutes
 to add new fields or validations. Open to extension, inherently closed
 to modification

 C. This is a dispatcher function which routes the request.body fields
 and is thus not reliant on anything but a request body and request verb.
 It return a clean object ready for operation

 D. Data types can be changed as need because the actual parsing, cleaning,
 restructuring is extracted to smaller external methods.

 E. The return value is an object containing {isValid: body: msg:}...
 so the route can determine easily whether to do IO work, render, , redirect, or throw.

 F. Update is tricky, and will be determined by business needs and the team
 preference. Each site is its own document, so duplicates, I would think,
 would only apply to timeslots and addresses (formatting problems
 there). However, if you are sending the whole object back for validation in order to update, timeslots are run through a validation function which disallows duplicates.  No need for async because update over-writes.  
