import { json } from '@sveltejs/kit';
import { OpenAI } from 'openai'
import { OPEN_AI_SECRET } from '$env/static/private'
import { THEMES_BY_AUTHOR } from '$lib/index.js';
import _ from 'lodash'

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, author } = body;

    const openai = new OpenAI({ apiKey: OPEN_AI_SECRET })

    const prompt = `
      Generate a book name with person's name of "${name}" included. 
      With with a theme or storyline of ${THEMES_BY_AUTHOR[author]}. 
      Minimum of 10 words but maximum word count is 16 only.
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = _.get(response, 'choices[0].message.content');

    return json(
      { title: reply },
      { status: 200, statusText: 'Book successfully generated.' }
    );

  } catch (error) {
    console.log(error)
    return json(
      { success: false, error: 'Failed to generate book' }, 
      { status: 500 }
    );
  }
}
