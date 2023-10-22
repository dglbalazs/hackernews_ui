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