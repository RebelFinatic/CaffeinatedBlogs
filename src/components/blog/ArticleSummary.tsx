interface ArticleSummaryProps {
  summary: string | null;
  hasSufficientContext: boolean;
}

export function ArticleSummary({ summary, hasSufficientContext }: ArticleSummaryProps) {
  if (!hasSufficientContext || !summary) {
    return null;
  }

  return (
    <div className="mb-8 p-6 rounded-lg bg-secondary/50 border border-border shadow-md">
      <h2 className="text-xl font-semibold font-headline mb-3 text-primary">AI Summary</h2>
      <p className="text-foreground/90 leading-relaxed">{summary}</p>
    </div>
  );
}
