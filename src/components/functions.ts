import type { Item } from "@/components/types"

export async function getData(baseUrl: string): Promise<string[]> {
    const response = await fetch(baseUrl + '/topstories.json?limitToFirst=10&orderBy="$key"')
    if (!response.ok) {
        throw new Error("Failed to fetch top stories")
    }
    return await response.json()
}


export async function getItem(baseUrl: string, itemId: string): Promise<Item> {
    const response = await fetch(baseUrl + "/item/" + itemId + ".json")
    if (!response.ok) {
        throw new Error("Failed to fetch item")
    }
    return await response.json()
}

// Not needed function, was just trying out looping items
// - however, it seems like the default descendant value which should remark the total comment count on an item is not always in synch with the actual comment number
// - sometimes descedants is lagging, and is not refreshed as quickly as the actual total comment count, however, using that is still a quicker solution that looping through all comments

export async function getCommentCount(baseUrl: string, itemId: string): Promise<number> {
    const response = await fetch(baseUrl + "/item/" + itemId + ".json")
    if (!response.ok) {
        throw new Error("Failed to fetch item")
    }

    // console.log(itemId)
    const data = await response.json() as Item;
    if (data.deleted) {
        return -1
    }
    if (!data.kids) return 0
    const kids = data.kids

    if (!(kids.length > 0) ) return 0

  // Create an array of promises for each kid's comment count
    const counts = await Promise.all(kids.map(async (kid: string) => {
        const count = await getCommentCount(baseUrl, kid);
        return count + 1; // Add 1 for the current comment
    }));
    
    // Sum up the counts
    return counts.reduce((acc, curr) => acc + curr, 0);
}

// CONSIDERATIONS

// - Stories do have count and all informations
// - Data fetch timeout and it false, then show a refresh error page

