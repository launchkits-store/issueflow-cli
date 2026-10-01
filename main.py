#!/usr/bin/env python3
"""
IssueFlow CLI - Mock implementation for demonstration
"""
import sys

def main():
    print("IssueFlow CLI v1.0.0 (SQLite-Cached)")
    if len(sys.argv) < 2:
        print("Usage: issueflow [list|add|sync]")
        return
    
    cmd = sys.argv[1]
    if cmd == "list":
        print("[1] [TODO] Fix authentication middleware timeout (#12)")
        print("[2] [IN PROGRESS] Implement monorepo change detection (#15)")
    elif cmd == "add":
        print("Task added successfully to local SQLite cache.")
    else:
        print(f"Unknown command: {cmd}")

if __name__ == "__main__":
    main()
