import { json } from '@remix-run/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function action({ request }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    
    const formData = await request.formData();
    const body = Object.fromEntries(formData);

    
    const favouriteSubject = body.favouriteSubject;
    const preferredTime = body.preferredTime;
    const taskDifficulties = typeof body.taskDifficulties === 'string' 
      ? JSON.parse(body.taskDifficulties) 
      : body.taskDifficulties;
    if (!process.env.API_KEY) {
      throw new Error('Google AI API key is not configured');
    }
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });
    const prompt = `Given the following information:
      - Favorite subject: ${favouriteSubject}
      - Preferred study time: ${preferredTime}
      - Task list: Microbiology Lab Report, Genetics Problem Set, Physiology Quiz, Ecology Research Paper, Evolutionary Biology Presentation, Biochemistry Lab Notes Submission, Molecular Biology Final Project
      - Task difficulties: ${JSON.stringify(taskDifficulties)}

      Please create a study plan that:
      1. Locates a time slot for each task- assuming that each task takes an hour (so like only provide the starting hour) where the hardest tasks are most closely scheduled to the preferred study time.
      2. makes the favourite subject be performed at a less optimal time (that is further from the preferred study time);
      
      Return the response as a list of objects with the study plan with the following format:
      [{time: "X:00", task: "______"},
        {time: "X:00", task: "______"},
        and so on...]
      Rules:
       - Only return the list as the response
       - Do not include any other text in the response
       - Do not include markup in the response
       - Do not include special characters like "\n" in the response
      Clarifications:
      - all the tasks should be scheduled before or after or during the optimal time. they cannot all be before or all after
      - the order of the tasks should be determined by their difficulty level
      `
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const studyPlan = response.text();

    return json({ 
      studyPlan 
    });

  } catch (error) {
    console.error('Error thingy:', error);
    return json({ 
      error: error.message || 'uh ohhh',
      details: error.toString()
    }, { 
      status: 500 
    });
  }
}