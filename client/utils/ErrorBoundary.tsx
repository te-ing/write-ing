import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: React.ElementType;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      info: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error: ', error);
    console.log('errorInfo: ', errorInfo);
  }

  render() {
    const { hasError, info } = this.state;
    const { children } = this.props;
    if (hasError && this.props.fallback) {
      <this.props.fallback error={info} />;
    } else if (hasError) {
      return <h3>에러가 발생했습니다. {info.message ? `error info: ${info.message}` : ''}</h3>;
    }
    return children;
  }
}

export default ErrorBoundary;
