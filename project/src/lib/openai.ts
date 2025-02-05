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
- Material selection criteria
- Implant prosthetics

2. Oral Surgery & Implantology
- Complex surgical protocols
- Advanced grafting techniques
- Immediate loading procedures
- Guided surgery workflows
- Complication management
- Advanced imaging interpretation

3. Endodontics
- Microsurgical techniques
- Complex canal morphology
- Regenerative procedures
- Advanced imaging interpretation
- Instrument selection
- Obturation protocols

4. Periodontics
- Advanced regenerative protocols
- Complex grafting procedures
- Perio-prosthetic interface
- Laser applications
- Microsurgical techniques
- Implant maintenance

5. Advanced General Dentistry
- Multidisciplinary treatment planning
- Complex case management
- Digital dentistry integration
- Advanced material science
- Practice management
- Risk assessment

Response Format:
1. Clinical Context
   - Specialty classification
   - Relevant guidelines
   - Evidence level

2. Detailed Analysis
   - Clinical decision trees
   - Risk factors
   - Contraindications
   - Technical considerations

3. Protocol Details
   - Step-by-step procedures
   - Material specifications
   - Equipment requirements
   - Technique pearls

4. Evidence Base
   - Research citations
   - Clinical studies
   - Success rates
   - Long-term outcomes

5. Risk Management
   - Complications
   - Prevention strategies
   - Management protocols
   - Follow-up care

Citations Format:
Author et al. (Year). Title. Journal, Volume(Issue), Pages.
Example: "Smith et al. (2023). Advanced Implant Protocols. Journal of Prosthetic Dentistry, 130(2), 45-52."

Remember: Your audience consists of licensed dental professionals with comprehensive understanding of fundamental principles. Only provide basic explanations if specifically requested.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      top_p: 0.95,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is not configured. Please add your API key to the .env file.');
      }
      if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      if (error.message.includes('401')) {
        throw new Error('Invalid API key. Please check your OpenAI API key in the .env file.');
      }
      
      throw error;
    }
    
    throw new Error('An unexpected error occurred while generating the response. Please try again.');
  }
};