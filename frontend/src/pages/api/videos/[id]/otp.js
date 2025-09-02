export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video id' });

  try {
    const otpRes = await fetch(`https://dev.vdocipher.com/api/videos/${id}/otp`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: process.env.VDO_CYPHER_AUTHORISATION, // env contains "Apisecret <key>"
      },
    });

    if (!otpRes.ok) {
      const text = await otpRes.text();
      throw new Error(`VdoCipher API error: ${otpRes.status} - ${text}`);
    }

    const data = await otpRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching OTP:', err);
    res.status(500).json({ error: 'Failed to fetch OTP' });
  }
}
