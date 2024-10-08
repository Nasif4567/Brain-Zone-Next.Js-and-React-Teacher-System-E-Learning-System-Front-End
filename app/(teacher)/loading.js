
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="w-screen h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }