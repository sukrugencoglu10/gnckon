export function ContainerCardSkeleton() {
  return (
    <article className="card flex flex-col overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative block aspect-[4/3] bg-ink-200">
        <div className="absolute left-3 top-3 h-5 w-12 rounded-full bg-ink-300"></div>
      </div>
      
      {/* Body Skeleton */}
      <div className="flex flex-1 flex-col p-4">
        {/* Type & City */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-20 rounded bg-ink-200"></div>
          <div className="h-3 w-16 rounded bg-ink-200"></div>
        </div>
        
        {/* Title */}
        <div className="mt-3 h-5 w-3/4 rounded bg-ink-200"></div>
        <div className="mt-1 h-5 w-1/2 rounded bg-ink-200"></div>
        
        {/* Badges */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="h-4 w-5/6 rounded bg-ink-200"></div>
          <div className="h-4 w-3/4 rounded bg-ink-200"></div>
          <div className="h-4 w-2/3 rounded bg-ink-200"></div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto pt-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 rounded-lg bg-ink-200"></div>
            <div className="h-9 rounded-lg bg-ink-200"></div>
          </div>
          <div className="mt-3 mx-auto h-4 w-1/2 rounded bg-ink-200"></div>
        </div>
      </div>
    </article>
  );
}

export function ContainerGridSkeleton() {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ContainerCardSkeleton key={i} />
      ))}
    </div>
  );
}
