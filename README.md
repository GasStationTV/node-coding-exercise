# GSTV BE Coding Exercise

1. [Exercise Overview](#exercise-overview)
1. [System Requirements](#system-requirements)
1. [Version Control](#version-control)
1. [JavaScript](#javascript)

## Exercise Overview
The site - an individual gas station - is the most atomic piece of the GSTV business model - it is at the core of everything we do. Our hardware is installed at the site, advertisers purchase impressions at a site level and schedules are generated on a per-site basis. Thus, keeping accurate information about a site is essential to maintaining business operations.

We are asking you to build out the ability to create, edit and view hours for a given site. We are focusing on the way you approach the services, and structure the Mongo documents - there is no expectation of a polished UI.  **We want you to focus on the server-side aspects of implementing these requirements.**

This data is used to help us know when to turn on and off hardware, how many times a video asset is expected to play and at its most basic level, whether the site is open when we try to call them.

A site may have multiple open and close times for a single day. For example they may be open in the morning, but close mid-afternoon and reopen for the after work rush hour. In many cases stations will be open past midnight, but business owners do not necessarily think of this as the next day.

[Taco Bell](http://s3-media2.fl.yelpcdn.com/bphoto/bzl1SoxoBR-ggedVDlECAA/ls.jpg) is a perfect example of business hours vs. chronological hours  - they may be open until 4am on Sunday, but you still think of it as Saturday night.

#### Creating and Editing Hours
Edit & Create Site hours have the same business rules. The main difference is that on edit the dropdowns and values are prepopulated, while in add they are blank.

- Format
  - For each day of the week
    - Day Label
      - Full name
    - Each day may have one or many time slots
    - For each Time Slot
        - Open Time
            - Dropdown
                - Values are in 30 minute increments
                - Values are in AM/PM format
                - Values
                  - Start at Midnight and end 11:30 PM
        - Close Time
            - Dropdown
                - Values are in 30 minute increments
                - Values are in AM/PM format
                - Values
                  - Start at 12:30 AM and end at 6:00 AM (next day)
                  - All values past 11:30 PM (values between Midnight and 6:00 AM) should have the text (next day) at the end
        - Remove Button
    - Open 24 Hours Button
    - Add Button
  - Close Button
  - Submit Button
- Functionality
  - Remove Button
    - Removes the selected time slot
    - If Open 24 Hours
      - Removes Open 24 Hours message
      - Displays one empty time slot
  - Add Button
    - Adds an additional time slot to the selected day
  - Open 24 Hours Button
    - Removes all the time slots if any exist
    - Hides Open 24 Hours Button
    - Message
      - Open 24 Hours
  - Close Button
    - User is returned to the spot where they opened the wizard and the view not reflect any changes
  - Submit Button
    - FE Validates values
      - Null Validation
        - If a start time is entered a close time is required
        - If a close time is entered a start time is required
          - Submit fails
            - Message
              - Unable to Create/Update: {itemName} is required.
      - Overlap/Duplicate Validation
        - If a timeslot for a given day overlaps any other time slots on the same day
          - Submit fails
            - Message
              - Unable to Create/Update: there is at least one overlapping timeslot
      - Time Slot Format Validation
        - If the start time falls after the end time
          - Message
            - Unable to Create/Update: The start time must be before the end time
        - If the end time falls before the start time
          - Message
            - Unable to Create/Update: The start time must be before the end time
        - If the start time falls on the end time
          - Message
            - Unable to Create/Update: The start time may not be the same date as the end time
      - If FE validation passes
        - Submit changes to the BE
    - BE validates values
      - Null Validation
        - If any required items are null
          - Submit fails
            - Message
              - Unable to Create/Update: {itemName} is required.
      - Unchanged Data Validation
        - If any required items are null
          - Submit fails
            - Message
              - Unable to Update: {itemName} {itemValue} has not been changed.
      - Duplicate Validation
        - If any required items are null
          - Submit fails
            - Message
              - Unable to Create/Update: {itemName} {itemValue} already exists.
      - Malformed Data Validation
        - If any required items are null
          - Submit fails
            - Message
              - Unable to Create/Update: {itemName} {itemValue} does not match the expected format.
      - Time Slot Format Validation
        - If the start time falls after the end time
          - Message
              - Unable to Create/Update: The start time must be before the end time
        - If the end time falls before the start time
          - Message
              - Unable to Create/Update: The start time must be before the end time
        - If the start time falls on the end time
          - Message
              - Unable to Create/Update: The start time may not be the same date as the end time
        - If BE validation passes
          - Update Data
              - User is returned to the spot where they opened the wizard and the view will reflect changes from the wizard.

#### Viewing Hours
- Format
  - Normal State
    - For current date/time
      - Open or Closed
        - Rules
          - If current date and time is within a defined open period, then Open
          - If current date and time is not within a defined open period, then Closed
    - For each day
      - Day Label
        - Full name
      - If not Open 24 hours
        - For each time slot
          - Open Time
          - Close Time
      - If Open 24 hours
        - Message
          - Open 24 hours
      - If Hours are Null
        - Message
          - Closed
    - Edit Site Hours Button
  - Empty State
    - Message
      - There are no site hours for {Site ID}.
    - Create Site Hours Button
- Functionality
  - Edit Site Hours Button
    - Links to Creating/Editing Hours
  - Create Site Hours Button
    - Links to Creating/Editing Hours

#### Extra Credit
##### Future Date/Time Open or Closed
Our field operations team often goes to sites for maintenance or upgrades. While creating their schedules it would be helpful to know if a site will be open on a given date and time in the future.

##### Timezones
GSTV has sites across the US. People from the Detroit main office may be calling sites in California. For that reason it is important to know the open times based upon a given timezone.

##### Daylight Savings Time
GSTV has sites in Arizona. Arizona does not participate in daylight savings time. For that reason it is important to know the open times based upon a site’s participation in daylight savings.

## System Requirements
* Node.js `^14.0.0`
* MongoDB `^4.0.0`

## Version Control
### GitFlow and GithubFlow
We use [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/) on a daily basis - this allows us to build quality control into our development, QA and deployment process.

We are asking that you use a modified [Github Flow](https://guides.github.com/introduction/flow/) - sometimes referred to as a [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) - methodology instead of GitFlow. Conceptually, GitFlow and Github flow are similar.

Please fork our repository and use a feature branch workflow while developing your functionality. When you are ready to submit your work make a [pull request against our repository](https://help.github.com/articles/using-pull-requests/).

## JavaScript
### Standards
We have a work in progress [style guide](https://github.com/airbnb/javascript) that you can refer to. We don't expect you to strictly adhere to these standards, but they may help provide insight into how our JavaScript is generally structured.

### Unit Testing
Please feel free to create unit tests - we use [Mocha](https://github.com/mochajs/mocha).
