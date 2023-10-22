import type { Item, ModifiedItem } from "@/components/types"

// ------------------------------
// Description: Function that fetches the IDs of articles for main pages
// Parameters: 
//      - baseUrl: string that is pointing towards the main endpoint
// Output: 
//      - an array of string containing the IDs of articles
// ------------------------------

export async function getData(baseUrl: string): Promise<string[]> {
    const response = await fetch(baseUrl + '/topstories.json?limitToFirst=10&orderBy="$key"')
    if (!response.ok) {
        throw new Error("Failed to fetch top stories")
    }
    return await response.json()
}


// ------------------------------
// Description: Function that fetches data of an Item based on Id and retuns the extended data for it meant to be shown in the output
// Parameters: 
//      - baseUrl: string that is pointing towards the main endpoint
//      - itemId: the Id of the desired Item as string
// Output: 
//      - an array of string containing the IDs of articles
// ------------------------------

export async function getItem(baseUrl: string, itemId: string): Promise<ModifiedItem> {
    const response = await fetch(baseUrl + "/item/" + itemId + ".json");
    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }
    const data = await response.json();
    const modifiedItem = prepareOutputData(data)
    
    return modifiedItem;
  }


// ------------------------------------------------------------------
// L O C A L   F U N C T I O N S
// ------------------------------------------------------------------

// ------------------------------
// Description: Function that modifies the data fetched from the API endpoint and returns the extended data meant to be shown
// Parameters: 
//      - data: as Item type fetched from API endpoint
// Output:
//      - modifiedItem extended type that contains extra variables for the UI
// ------------------------------
function prepareOutputData(data: Item) : ModifiedItem {
    const timeExact = formatDateTimeWithTimezone(data.time);
    
    // Create a ModifiedItem with the additional field
    const modifiedItem: ModifiedItem = {
      ...data,
      timeExact,
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

// EXTRA CONSIDERATIONS

// - Stories do have count and all informations
// - Data fetch timeout and it false, then show a refresh error page

