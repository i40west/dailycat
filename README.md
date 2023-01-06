# dailycat

Just a silly Cloudflare Worker, written with ChatGPT, that returns a cat
picture, and renews that picture each day from [The Cat API](https://thecatapi.com).

Hit `/cat` to get a cat picture.

Expects an API key in a `CAT_API_KEY` environment variable. You can put
it there with `wrangler secret put CAT_API_KEY`. There is a cron trigger
to hit the API once per day.

Expects a KV namespace bound to `env.meow`. You can do this in the
Cloudflare dashboard, or with `wrangler kv:namespace create "meow"`.
The `wrangler.toml` file should be configured with the namespace ID.

Your Cloudflare account ID also needs to be in `wrangler.toml`.

The Github Actions deployment will need a `CF_API_TOKEN` secret, which
you can get from the Cloudflare dashboard.

If you don't like today's cat, send a GET request to `/renew` to make
it fetch a new one.

The `/` path returns an error, to dissuade freeloaders.

Meow. 🐈
