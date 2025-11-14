import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  // Fix: Correct the type of 't' to allow for an options object, matching its usage elsewhere.
  t: (key: string, options?: any) => string;
}

interface State {
  hasError: boolean;
}

// Fix: The original class component had issues with `this.props` and `this.state` not being found.
// Replaced the constructor with a class field for state initialization, which is a more robust
// and modern approach that resolves these typing issues.
class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div>
                <i className="fa-solid fa-bomb fa-4x text-red-500 mb-4"></i>
                <h1 className="text-3xl font-bold mb-2">{this.props.t('error_boundary_title')}</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{this.props.t('error_boundary_message')}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    {this.props.t('error_boundary_button')}
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
