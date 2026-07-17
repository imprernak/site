/**
 * Sends the collected selections to Formspree, which emails
 * diwakerraj.dr@gmail.com with every field below.
 *
 * To switch providers (EmailJS / Supabase), this is the only function
 * that needs to change — the UI calls submitProposal() and doesn't
 * care what happens inside.
 *
 * @param {{ date: string, venue: string, customSuggestion: string }} selection
 * @returns {Promise<boolean>}
 */
export async function submitProposal(selection) {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  if (!endpoint) {
    console.warn(
      "VITE_FORMSPREE_ENDPOINT is not set — see README-proposal.md. Skipping network call."
    );
    return false;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        selectedDate: selection.date,
        selectedVenue: selection.venue,
        customSuggestion: selection.customSuggestion || "—",
        timestamp: new Date().toISOString(),
        _subject: "A new answer has arrived ♡",
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("submitProposal failed:", error);
    return false;
  }
}
