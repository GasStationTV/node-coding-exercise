

### Exercise:

 Schedule Time Slots for individual locations.


 Node and MongoDb w/
 - babel
 - momentjs
 - mongoose
 -
 ## Intentions for Models:

 ##### Approach 1 - Associations
 * Lookup for individual sites would be faster if they maintain a small document structure, with associations to the business schedules.
 * Sites can have an array of schedule ObjectIds so a site can have a standard schedule but also holiday schedules that can be cross referenced with date.Now() on load.  
 * Each Schedule will have the associated site_id as well as either an object structure or array of days.
 * Each day will have a Boolean flag for isOpen24, as well as an array of TimeSlot ids.
 * TimeSlots will have a reference to the schedule_id as well as  open: and close: fields.
 * Eaching over Arrays of ids may give more control, but slows lookup time.  Using the populate method is faster, but I need to check how to modify on populate, and whether it saves.  

 ##### Approach 2 - Single Document
 * A single document drastically decreases amount of IO lookup.  
 * Much heavier document to bring back for each site. If there are 20,000 documents, and each is large, it may be to slow.
 * Single doc has a structure that is easy to reason about.
 * However this approach means that when viewing all sites, you have brought more information back than needed, heavy payload.
 * Much easier to manipulate with one lookup.
 * May be less flexible than maintaining arrays of ids. Difficult to add different schedules, but you maintain an array of holidays instead.  


 Overall, I chose to use associations and smaller document sizes, believing that in production you may need more flexibility.  That may not be the case however.  Depending on business needs, updating and viewing a strict 7 day schedule, may be all that is needed.  



 ## Routes

 ##### Approach and Challenges
 * In production, we would be sending the appropriate JSON back to the client.  However here, in order to produce something given two afternoons of work, I skipped the front-end work and rendered standard jade templates just to view the response.
 * This was one of the largest problems I faced, which was unfortunate because time was meant to be focused on producing a back end.
     * Without sending JSON and having an interactive FE, I found myself unable to work through the features properly.  Without a dynamic form, I couldn't accurately or quickly test my routes or produce a proper request body for clean use in DB functions. Time wasted.



 ## RETRO and Conclusion

 * Overall I failed to deliver a workable solution, and struggled making design decisions without knowing further requirements or how to handle edge cases.  
    * This is where team communication is critical.  Given that this was a coding exercise/test, I could not work alongside the team, look at their business logic, see their FE, or read through UML diagrams and Schemas.  In an actual work environment, given access to those resources, making design decisions as a team make development much easier and faster.
 * Getting caught up in the abyss of the unknown, and not making design decisions quickly enough, but the time I had.. time was up and I was unable to
     * parse time and date with momentjs
     * build and effective contrived FE
     * implement validations
