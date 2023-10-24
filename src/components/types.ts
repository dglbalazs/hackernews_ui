// TYPE DEFINITIONS

// ITEMS
export interface Item {
    id: string;                                                 // The item's unique id.
    deleted?: boolean;                                          // true if the item is deleted.
    type: "job" | "story" | "comment" | "poll" | "pollopt";     // Type of Item
    by: string;                                                 // The username of the item's author.
    time: number;                                               // Creation date of the item, in Unix Time.

    text?: string;                                              // Comment, story, or poll text in HTML
    dead?: boolean;                                             // true if the item is dead.
    parent?: string;                                            // The comment's parent (item ID)
    poll?: string;                                              // The pollopt's associated poll (item ID)
    kids?: string[];                                            // The IDs of the item's comments
    url?: string;                                               // The URL of the story
    score?: number;                                             // The story's score or votes for a pollopt
    title?: string;                                             // The title of the story, poll, or job
    parts?: string[];                                           // List of related pollopts (item IDs)
    descendants?: number;                                       // Total comment count
  }

  // ITEM WITH EXTRA FIELDS
  export interface ModifiedItem extends Item {
    timeExact: string;
    byKarma?: number;
    itemIndex: number;
  }


  // RETURN TYPE FOR LIST OF IDs DATA FETCH 
  export interface itemListReturn {
    hasData: boolean,
    dataArr: string[] ,
    indexArr: number[]
  }

// USER
export interface User {
    id: string;        // The user's unique username. Case-sensitive. Required.
    created: number;   // Creation date of the user, in Unix Time.
    karma: number;     // The user's karma.
    about?: string;    // The user's optional self-description. HTML.
    submitted: string[]; // List of the user's stories, polls, and comments.
  }