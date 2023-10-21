

export async function getData(baseUrl: string) {
    const response = await fetch(baseUrl + "/topstories.json")
    if (!response.ok) {
        throw new Error("Failed to fetch top stories")
    }
    return await response.json()
}


export async function getItem(baseUrl: string, itemId: string) {
    const response = await fetch(baseUrl + "/item/" + itemId + ".json")
    if (!response.ok) {
        throw new Error("Failed to fetch item")
    }
    return await response.json()
}

export async function getCommentCount(baseUrl: string, itemId: string) {
    const response = await fetch(baseUrl + "/item/" + itemId + ".json")
    if (!response.ok) {
        throw new Error("Failed to fetch item")
    }

    // console.log(itemId)
    const data = await response.json()
    console.log(data)
    if ("deleted" in data && data.deleted) {
        console.warn(data)
        return -1
    }
    if (!("kids" in data)) return 0
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

