export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST with folderName.' });
  }

  const { folderName } = req.body;

  if (!folderName) {
    return res.status(400).json({ error: 'folderName is required in body.' });
  }

  try {
    // Step 1: Search for folder by name
    const folderResponse = await fetch('https://dev.vdocipher.com/api/videos/folders/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: process.env.VDO_CYPHER_AUTHORISATION, // "Apisecret <key>"
      },
      body: JSON.stringify({
        name: folderName,
        searchExact: true,
      }),
    });

    if (!folderResponse.ok) {
      const errorText = await folderResponse.text();
      throw new Error(`Folder search failed: ${folderResponse.status} - ${errorText}`);
    }

    const folderData = await folderResponse.json();
    const folder = folderData.folders?.[0];

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Step 2: Fetch videos from folder
    const videosResponse = await fetch(
      `https://dev.vdocipher.com/api/videos?folderId=${folder.id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.VDO_CYPHER_AUTHORISATION,
        },
      }
    );

    if (!videosResponse.ok) {
      const errorText = await videosResponse.text();
      throw new Error(`Videos fetch failed: ${videosResponse.status} - ${errorText}`);
    }

    const videosData = await videosResponse.json();

    return res.status(200).json({
      folder: {
        id: folder.id,
        name: folder.name,
        createdAt: folder.createdAt,
      },
      videos: videosData.rows || [],
    });
  } catch (error) {
    console.error('Error fetching folder/videos:', error);
    return res.status(500).json({ error: 'Failed to fetch folder/videos' });
  }
}
