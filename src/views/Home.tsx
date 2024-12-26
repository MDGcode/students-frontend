export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Welcome to the Dashboard
        </h1>

        {/* Grid layout for columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Express Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Express
            </h2>
            <div>
              <a
                href="/express/table/students"
                className="block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Express Student Table
              </a>
            </div>
            <div>
              <a
                href="/express/table/homework"
                className="block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Express Homework Table
              </a>
            </div>
            <div>
              <a
                href="/express/table/assign-homework"
                className="block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Express Homework Assign
              </a>
            </div>
          </div>

          {/* Node Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Node</h2>
            <div>
              <a
                href="/node/table/students"
                className="block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Node Student Table
              </a>
            </div>
            <div>
              <a
                href="/node/table/homework"
                className="block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Node Homework Table
              </a>
            </div>
            <div>
              <a
                href="/node/table/assign-homework"
                className="block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Node Homework Assign
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
