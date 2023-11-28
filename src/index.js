import { Hono } from 'hono';

let app = new Hono();

app.get('/', () => {
	return new Response("I'm a teapot.", { status: 418 });
});

app.get('/cat', async (c) => {
	// Retrieve the image and metadata from the KV store
	const { value, metadata } = await c.env.meow.getWithMetadata('today', { type: 'stream' });

	// If the returned value is null, return a 404 response.
	if (value === null) {
		console.log("No cat image found for today");
		return c.notFound();
	}

	// Use the contentType property of the metadata object as the Content-Type header,
	// or fall back to image/jpeg if it is not set
	const contentType = metadata.contentType || 'image/jpeg';
	return new Response(value, {
		headers: {
			'Content-Type': contentType
		}
	});
});

// Manually make it get a new image.
app.get('/renew', (c) => getCat(c.env));

// Optional subpath
app = app.route('/dailycat', app);

async function getCat(env) {
	try {
		// Perform a GET request to the cat API to retrieve an image.
		// CAT_API_KEY should be set with `wrangler secret put CAT_API_KEY`
		const response = await fetch('https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg', {
			headers: { 'x-api-key': env.CAT_API_KEY },
		});
		if (!response.ok) {
			throw new Error(`Failed to retrieve image from cat API: ${response.statusText}`);
		}
		const data = await response.json();
		const imageUrl = data[0].url;
		const width = data[0].width;
		const height = data[0].height;

		// Retrieve the image from the URL
		const imageResponse = await fetch(imageUrl);
		if (!imageResponse.ok) {
			throw new Error(`Failed to retrieve image from URL: ${imageResponse.statusText}`);
		}
		// Save the image to the KV store and set the contentType and dimensions in the metadata
		await env.meow.put('today', imageResponse.body, {
			metadata: {
				contentType: imageResponse.headers.get('Content-Type'),
				width,
				height
			}
		});
		return new Response('ok', { status: 200 });
	} catch (error) {
		return new Response(error.message, {
			status: 500,
			statusText: 'Internal Server Error'
		});
	}
}

export default {
	fetch: app.fetch,
	scheduled: async (_, env, ctx) => { ctx.waitUntil(getCat(env)) },
}
