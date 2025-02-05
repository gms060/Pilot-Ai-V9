import MistralClient from '@mistralai/mistralai';

const getMistralInstance = () => {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  
  if (!apiKey) {
    throw new Error('Mistral API key is not configured. Please add your API key to the .env file.');
  }
  
  return new MistralClient(apiKey);
};

export const generateResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const mistral = getMistralInstance();
    
    const systemMessage = `You are a highly knowledgeable dental AI assistant specializing in evidence-based dentistry. 
    Your responses should:
    - Be based on current scientific evidence and clinical guidelines
    - Include relevant citations when appropriate
    - Be clear and concise while maintaining clinical accuracy
    - Focus on practical clinical applications
    - Acknowledge limitations and uncertainties when they exist
    - Avoid giving direct medical advice, instead frame responses as general information
    - Use professional terminology appropriate for dental practitioners`;

    const formattedMessages = [
      { role: 'system', content: systemMessage },
      ...messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    const chatResponse = await mistral.chat({
      model: "mistral-large-latest",
      messages: formattedMessages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    if (!chatResponse.choices?.[0]?.message?.content) {
      throw new Error('No response received from Mistral API');
    }

    return chatResponse.choices[0].message.content;
  } catch (error) {
    console.error('Error details:', error);
    
    if (error instanceof Error) {
      // Handle specific API errors
      if (error.message.includes('401')) {
        throw new Error('Invalid API key. Please check your Mistral API key in the .env file.');
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      if (error.message.includes('500')) {
        throw new Error('Mistral API service error. Please try again later.');
      }
      if (error.message.includes('API key')) {
        throw new Error('Mistral API key is not configured. Please add your API key to the .env file.');
      }
      
      // If it's a known error, throw it directly
      throw error;
    }
    
    // For unknown errors, provide a generic message
    throw new Error('An unexpected error occurred. Please try again.');
  }
};