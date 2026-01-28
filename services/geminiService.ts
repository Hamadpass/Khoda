
import { GoogleGenAI, Chat } from "@google/genai";
import { CartItem, Language } from "../types";

export const createShoppingAssistant = (lang: Language, cartItems: CartItem[]): Chat | null => {
  // Fixed: Directly use process.env.API_KEY as per the @google/genai guidelines
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing. AI Assistant disabled.");
    return null;
  }

  try {
    // Fixed: Initialized with named parameter as required
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const ingredientList = cartItems.map(i => i.name[lang]).join(", ");
    
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'Khodarji AI', a friendly shopping assistant for a Jordanian fresh produce store. 
        The customer's language is ${lang === 'ar' ? 'Arabic' : 'English'}.
        Current cart contents: ${ingredientList || 'Empty'}.
        Help users with:
        1. Recipe ideas based on their cart.
        2. Storage tips for fruits and vegetables.
        3. Seasonal advice for Jordan.
        Keep responses helpful, concise, and professional. Use local Jordanian context where appropriate.`,
        temperature: 0.7,
      },
    });
  } catch (e) {
    console.error("Failed to initialize Gemini AI:", e);
    return null;
  }
};

export const sendAssistantMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    // result.text is a property, not a method
    return result.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Service temporarily unavailable.";
  }
};
