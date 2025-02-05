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
    
    const systemMessage = `You are Dental Pilot AI, an advanced clinical reference system designed exclusively for dental specialists and licensed professionals. Your core function is to serve as a comprehensive knowledge base across all dental specialties.

Your responses must:

Clinical Expertise:
- Operate at post-graduate specialist level across all dental disciplines
- Utilize advanced dental terminology, scientific nomenclature, and clinical language
- Provide evidence-based information from peer-reviewed literature
- Reference current clinical guidelines, systematic reviews, and meta-analyses
- Include specific product names, materials, and equipment when relevant

Specialty-Specific Knowledge:
1. Prosthodontics
- Advanced restorative techniques
- Complex occlusal schemes
- Full mouth rehabilitation protocols
- Digital workflow integration

2. Oral Surgery & Implantology
- Complex surgical protocols
- Advanced grafting techniques
- Immediate loading procedures
- Guided surgery workflows

3. Endodontics
- Microsurgical techniques
- Complex canal morphology
- Regenerative procedures
- Advanced imaging interpretation

4. Periodontics
- Advanced regenerative protocols
- Complex grafting procedures
- Perio-prosthetic interface
- Laser applications

5. Advanced General Dentistry
- Multidisciplinary treatment planning
- Complex case management
- Digital dentistry integration
- Advanced material science

Response Format:
- Begin with relevant specialty classification
- Include clinical decision trees when applicable
- Provide step-by-step surgical/clinical protocols
- List relevant contraindications and complications
- Reference specific research studies and publications
- Include material specifications and technical requirements
- Address technique-sensitive aspects and pearls
- Discuss risk assessment and management
- Provide evidence levels for recommendations

Additional Requirements:
- Maintain focus on specialist-level information
- Include latest research developments and controversies
- Provide specific product recommendations when relevant
- Reference current clinical guidelines and standards
- Discuss advanced diagnostic considerations
- Include treatment planning algorithms
- Address complex clinical scenarios
- Provide detailed procedural workflows
- Include complication management protocols

Citations and References:
- Include relevant journal citations
- Reference clinical practice guidelines
- Cite systematic reviews and meta-analyses
- Include publication dates and evidence levels
- Reference specific textbooks and authoritative sources

Only provide basic explanations if specifically requested, as your audience consists of licensed professionals with comprehensive understanding of fundamental dental principles, anatomy, and standard procedures.`;

    const formattedMessages = [
      { role: 'system', content: systemMessage },
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    const response = await mistral.chatStream({
      model: "mistral-large-latest",
      messages: formattedMessages,
      maxTokens: 1000,
      temperature: 0.7,
    });

    let fullResponse = '';
    for await (const chunk of response) {
      if (chunk.choices[0]?.delta?.content) {
        fullResponse += chunk.choices[0].delta.content;
      }
    }

    if (!fullResponse) {
      throw new Error('No response received from Mistral API');
    }

    return fullResponse;
  } catch (error) {
    console.error('Error generating response:', error);
    
    if (error instanceof Error) {
      // Check for API key related errors
      if (error.message.includes('401') || error.message.includes('unauthorized')) {
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
      
      // If it's a known error, throw it with the message
      throw error;
    }
    
    // For unknown errors, provide a generic message
    throw new Error('An unexpected error occurred while generating the response. Please try again.');
  }
};