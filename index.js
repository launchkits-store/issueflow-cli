#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const dbFile = path.join(process.cwd(), '.issues.json');

function loadIssues() {
  if (!fs.existsSync(dbFile)) return [];
  try { return JSON.parse(fs.readFileSync(dbFile, 'utf8')); } catch (e) { return []; }
}

function saveIssues(issues) {
  fs.writeFileSync(dbFile, JSON.stringify(issues, null, 2));
}

if (command === 'init') {
  if (!fs.existsSync(dbFile)) {
    saveIssues([]);
    console.log('✓ Initialized IssueFlow repository (.issues.json created)');
  } else {
    console.log('IssueFlow is already initialized in this directory.');
  }
} else if (command === 'add') {
  const taskText = args[1];
  if (!taskText) {
    console.log('Error: Please specify task description. Example: issueflow add "Fix auth bug"');
    process.exit(1);
  }
  const issues = loadIssues();
  const newIssue = { id: issues.length + 1, title: taskText, status: 'open', createdAt: new Date().toISOString() };
  issues.push(newIssue);
  saveIssues(issues);
  console.log(`✓ Added issue #${newIssue.id}: "${taskText}"`);
} else if (command === 'list') {
  const issues = loadIssues();
  if (issues.length === 0) {
    console.log('No issues found. Run `issueflow add "task"` to create one.');
  } else {
    console.log('\n--- IssueFlow Tasks ---');
    issues.forEach(i => console.log(`#${i.id} [${i.status.toUpperCase()}] ${i.title}`));
    console.log('');
  }
} else {
  console.log('IssueFlow CLI v1.0.0');
  console.log('Usage: issueflow <init|add|list>');
}
