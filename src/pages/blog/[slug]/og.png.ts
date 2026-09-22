import type { APIRoute } from 'astro';
import { getPublishedPosts, type BlogPost } from '../../../utils/blog';
import { generateOgImageForPost } from '../../../utils/ogImage';

export async function getStaticPaths() {
  const posts = await getPublishedPosts();

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: BlogPost;
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as Props;

  try {
    const pngBuffer = await generateOgImageForPost(post);

    return new Response(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error(`Failed to generate OG image for post ${post?.slug}:`, error);
    return new Response('Error generating OG image', { status: 500 });
  }
};
