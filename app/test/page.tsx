"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TestPage() {
  const [sbd, setSbd] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const testSbd = async (sbd: string) => {
    try {
      const response = await fetch(`/api/exam-results?sbd=${sbd}`)
      if (!response.ok) {
        return { sbd, success: false, error: await response.text() }
      }
      const data = await response.json()
      return { sbd, success: true, data }
    } catch (err) {
      return { sbd, success: false, error: err }
    }
  }

  const handleTest = async () => {
    setLoading(true)
    try {
      const result = await testSbd(sbd)
      setResults([result, ...results])
    } catch (err) {
      setError("Test failed")
    } finally {
      setLoading(false)
    }
  }

  // Test a batch of SBDs on load
  useEffect(() => {
    const runTests = async () => {
      setLoading(true)
      try {
        // Test specific SBDs
        const testResults = await Promise.all([testSbd("2501001"), testSbd("2501016"), testSbd("2501053")])
        setResults(testResults)
      } catch (err) {
        setError("Test failed")
      } finally {
        setLoading(false)
      }
    }

    runTests()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Search Functionality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input type="text" value={sbd} onChange={(e) => setSbd(e.target.value)} placeholder="Enter SBD to test" />
            <Button onClick={handleTest} disabled={loading}>
              Test
            </Button>
          </div>

          {loading ? (
            <p>Running tests...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border p-4 rounded">
                  <h3 className="font-bold">Test SBD: {result.sbd}</h3>
                  <p>Success: {result.success ? "Yes" : "No"}</p>
                  {result.success ? (
                    <pre className="bg-gray-100 p-2 mt-2 overflow-auto text-xs">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-red-500">{result.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <Button onClick={() => (window.location.href = "/")} className="bg-[#123363] hover:bg-[#0a1d3d]">
              Back to Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
