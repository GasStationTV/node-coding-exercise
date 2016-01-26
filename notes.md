## Notes:

TO DO
- MOCHA route tests and functions if time allows
- error messages
- patch timeslots
- handle update async on total body update 




#### My reasoning behind the `validateBody()` method:
```

 A. It is safe to use JSON Format

 B. I have formed the structure of the cases around my Data Model.
 However, with the switch case, it can be extended or modified
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
 so the route can determine easily whether to do IO work, render, or direct

 F. Notice the verb, create is direct where you validate presence, format,
 return. But update is more complex. It requires async calls
 to the DB to check for duplicate values (etc.),
 You could make the argument that you cannot create 2 of the same texacos,
 however, that is only a matter of adding those methods elsewhere, and
 plugging them in where they are needed.

 G. Update is tricky, and will be determined by business needs and the team
 preference. Each site is its own document, so duplicates, I would think,
 would only apply to timeslots, and Maybe.. addresses (formatting problems
 there).

```

#### The Validate Object Library

* The validate object can take any number of specific validation functions
 Here, it is contrived, so many of them need very similar validations.
However, in the future, it can easily be extended to be as robust as needed.
 I'm using very similar functions for now, but each can be extended to
parse or format the data properly..email,phone,etc
