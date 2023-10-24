import type { Item, ModifiedItem, itemListReturn, User } from "@/components/types"

// ------------------------------
// Description: Function that fetches the IDs of articles for main pages
// Parameters: 
//      - baseUrl: string that is pointing towards the main endpoint
//      - endpoint: string that is pointing towards the sub-endpoint, e.g.: top stories, new stories, etc.
//      - showNumber: number that incidates how many stories should we fetch
//      - pageNumber: number that incidates which page are we at
// Output: 
//      - an array of string containing the IDs of articles
// ------------------------------

export async function getData(baseUrl: string,  endpoint: string, showNumber: number, pageNumber: number): Promise<itemListReturn>{
    
    const actualPageIndex = pageNumber ? pageNumber - 1 : 0
    const startAt = actualPageIndex && actualPageIndex > 0 ? actualPageIndex * showNumber : 0

    const response = await fetch(baseUrl + '/' + endpoint +'.json?startAt="' + startAt +'"&limitToFirst=' + showNumber + '&orderBy="$key"')

    if (!response.ok) {
        throw new Error("Failed to fetch top stories")
    }

    const data = await response.json()
    
    const returnData = prepareListOutputData(data)
    return returnData
}


// ------------------------------
// Description: Function that fetches data of an Item based on Id and retuns the extended data for it meant to be shown in the output
// Parameters: 
//      - baseUrl: string that is pointing towards the main endpoint
//      - itemId: the Id of the desired Item as string
//      - itemIndex: index of the story in order to maintain the order
// Output: 
//      - an array of string containing the IDs of articles
// ------------------------------

export async function getItem(baseUrl: string, itemId: string, itemIndex: number): Promise<ModifiedItem> {

    const response = await fetch(baseUrl + "/item/" + itemId + ".json");
    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }
    const data = await response.json();
    const user = await getUserInfo(baseUrl, data.by)

    const modifiedItem = prepareItemOutputData(data, user, itemIndex)
    
    return modifiedItem;
  }

// ------------------------------
// Description: Function that fetches data for a user based on their Id
// Parameters: 
//      - baseUrl: string that is pointing towards the main endpoint
//      - userId: the Id of the desired User as string
// Output: 
//      - an object containing user information
// ------------------------------

export async function getUserInfo(baseUrl: string, userId: string): Promise<User> {
    const response = await fetch(baseUrl + "/user/" + userId + ".json");
    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }
    const user = await response.json();
    
    return user;
  }


// ------------------------------------------------------------------
// L O C A L   F U N C T I O N S
// ------------------------------------------------------------------

// ------------------------------
// Description: Function that modifies the list of IDs fetched from the API endpoint and returns a purified response
// Parameters: 
//      - data: List of IDs fetched from Item API endpoint: can be either a simple array or an object
// Output:
//      - itemListReturn Type object that contains a boolean variable remarking whether we have data or not, an array for results and another one for the indices
// ------------------------------
function prepareListOutputData(data: string[] | Map<number,string>) {
 
  const returnObject: itemListReturn = {
    hasData: false,
    dataArr: [],
    indexArr: []
  }

  if (data == null) {
    return returnObject
  }

  let dataArray: string[];
  let indexArray: number[];

  // In case it is an array
  if (Array.isArray(data)) {
    dataArray = (data as string[]).filter((item) => item);
    indexArray = dataArray.map((item) => data.indexOf(item))

  // In case it is an object
  } else {
    dataArray = Object.values(data)
    indexArray = Object.keys(data).map((index) => parseInt(index))
  } 

  returnObject.hasData = dataArray.length ? true : false
  returnObject.dataArr = dataArray
  returnObject.indexArr = indexArray
  
  return returnObject
}

// ------------------------------
// Description: Function that modifies the data fetched from the API endpoint and returns the extended data meant to be shown
// Parameters: 
//      - data: Item object type fetched from Item API endpoint
//      - user: User object type fetched from User API endpoint
//      - itemIndex: number that indicates the index of the story in the corresponding category
// Output:
//      - modifiedItem extended type that contains extra variables for the UI
// ------------------------------
function prepareItemOutputData(data: Item, user: User, itemIndex: number) : ModifiedItem {
    const timeExact = formatDateTimeWithTimezone(data.time);
    const byKarma = user.karma ? user.karma : 0
    
    // Create a ModifiedItem with the additional field
    const modifiedItem: ModifiedItem = {
      ...data,
      timeExact,
      byKarma,
      itemIndex
    };

    return modifiedItem
}

// ------------------------------
// Description: Function to format UNIX time to exact date and time with timezone
// Parameters: 
//      - unixTime: as number
// Output: 
//      - a string that contains the exact time and date with the corresponding timezone
// ------------------------------
function formatDateTimeWithTimezone(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
  
    return new Intl.DateTimeFormat(undefined, options).format(date);
  }
