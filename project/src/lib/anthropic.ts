import Anthropic from '@anthropic-ai/sdk';

const getAnthropicInstance = () => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error('Anthropic API key is not configured. Please add your API key to the .env file.');
  }
  
  return new Anthropic({
    apiKey
  });
};

export const generateResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const anthropic = getAnthropicInstance();
    
    const systemMessage = `You are a highly knowledgeable dental AI assistant specializing in evidence-based dentistry. 
    Your responses should:
    - Be based on current scientific evidence and clinical guidelines
    - Include relevant citations when appropriate
    - Be clear and concise while maintaining clinical accuracy
    - Focus on practical clinical applications
    - Acknowledge limitations and uncertainties when they exist
    - Avoid giving direct medical advice, instead frame responses as general information
    - Use professional terminology appropriate for dental practitioners`;

    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0.7,
      system: systemMessage,
      messages: formattedMessages
    });

    if (!response?.content?.[0]?.text) {
      throw new Error('No response content received from Anthropic API');
    }

    return response.content[0].text;
  } catch (error) {
    console.error('Error details:', error);
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('401') || error.message.includes('unauthorized')) {
        throw new Error('Invalid API key. Please check your Anthropic API key in the .env file.');
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      if (error.message.includes('500')) {
        throw new Error('Anthropic API service error. Please try again later.');
      }
      if (error.message.includes('API key')) {
        throw new Error('Anthropic API key is not configured. Please add your API key to the .env file.');
      }
      
      // If it's a known error, throw it directly
      throw error;
    }
    
    // For unknown errors, provide a generic message
    throw new Error('An unexpected error occurred. Please try again.');
  }
};