export interface PhotoAnalysis {
  appearance: string;
  hairStyle: string;
  skinTone: string;
  facialFeatures: string;
  glasses: boolean;
  outfit: string;
  suggestedPose: string;
}

export interface PreviewOptions {
  recipientName?: string;
  plaqueText?: string;
  companyLogo?: string;
  outfitStyle?: string;
}

export interface PreviewResult {
  analysis: PhotoAnalysis;
  prompt: string;
  generatedAt: string;
}
