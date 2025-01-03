import React, { useState, useEffect } from "react";
import { useApi } from "@/hook/APIContext";
import { Eye, EyeOff, Copy, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const { apiKey, setApiKey } = useApi();
  const [newApiKey, setNewApiKey] = useState(apiKey || ""); // Initial state from context
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  // Update newApiKey when apiKey changes
  useEffect(() => {
    setNewApiKey(apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (message.type === "success") {
      const timer = setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const validateApiKey = (key) => {
    return key.trim().length >= 20;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const trimmedKey = newApiKey.trim();

    if (!validateApiKey(trimmedKey)) {
      setMessage({
        type: "error",
        content: "API key should be at least 20 characters long",
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setApiKey(trimmedKey);
      setMessage({
        type: "success",
        content: "API key updated successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        content: "Failed to update API key. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemove = async () => {
    setLoading(true);
    try {
      setApiKey('');  // Actually clear the API key
      setNewApiKey(''); // Clear the input field
      setShowRemoveDialog(false); // Close the dialog
      setMessage({
        type: 'success',
        content: 'API key removed successfully!'
      });
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newApiKey);
      setCopied(true);
    } catch (err) {
      setMessage({
        type: "error",
        content: "Failed to copy to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                API Configuration
              </h2>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-gray-700"
                  >
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      id="apiKey"
                      type={showKey ? "text" : "password"}
                      value={newApiKey}
                      onChange={(e) => setNewApiKey(e.target.value)}
                      className="w-full pr-24 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your API key"
                      disabled={loading}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        aria-label={showKey ? "Hide API key" : "Show API key"}
                      >
                        {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        aria-label="Copy API key"
                        disabled={!newApiKey}
                      >
                        {copied ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {message.content && (
                  <Alert
                    variant={
                      message.type === "error" ? "destructive" : "default"
                    }
                    className="mt-4"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{message.content}</AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading || !newApiKey}
                    className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Updating..." : "Update Key"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRemoveDialog(true)}
                    disabled={loading || !apiKey}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Remove Key
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove your API key? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowRemoveDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemove}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={loading}
            >
              {loading ? 'Removing...' : 'Remove'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
};

export default Settings;
