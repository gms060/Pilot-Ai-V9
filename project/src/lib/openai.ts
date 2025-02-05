import OpenAI from 'openai';

const getOpenAIInstance = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add your API key to the .env file.');
  }
  
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generateResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const openai = getOpenAIInstance();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable dental AI assistant specializing in evidence-based dentistry. 
          Your responses should:
          - Be based on current scientific evidence and clinical guidelines
          - Include relevant citations when appropriate
          - Be clear and concise while maintaining clinical accuracy
          - Focus on practical clinical applications
          - Acknowledge limitations and uncertainties when they exist
          - Avoid giving direct medical advice, instead frame responses as general information
          - Use professional terminology appropriate for dental practitioners`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error && error.message.includes('API key')) {
      throw new Error('OpenAI API key is not configured. Please add your API key to the .env file.');
    }
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
};