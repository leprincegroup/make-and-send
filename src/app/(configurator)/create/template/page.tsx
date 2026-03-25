import { redirect } from "next/navigation";

// Template selection has been removed — the product is fully custom.
// Redirect to the photo upload step.
export default function TemplateStepPage() {
  redirect("/create/photo");
}
