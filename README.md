# For Each Git Repository

This [fed](https://github.com/MamadouSy/fed) extension allows to execute git command on several git repositories.


## Installation

Please install [fed](https://github.com/MamadouSy/fed) first, then:

    $ sudo npm install --global node-fed-git
    $ sudo fed fed-add-modules node-fed-git --global

## Usage

    $ fed [directories...] <git-command>

- directories 
Name(s) of directory or group to loop through.
If loop through all directories (from config) by default

- git-command 
One of the following git command: 
init, clone, status, checkout, branch,
merge, commit, add, stash

## fed.json

List all directories with their git repository:

    {
        "dirs" : [
            {
                "name"   : "repo1",
                "groups" : ["group1"],
                "repository" : {
                    "type" : "git",
                    "url" :  "path/to/repo1"
                }
            },
            {
                "name"   : "repo2",
                "groups" : ["group1", "group2"],
                "repository" : {
                    "type" : "git",
                    "url" :  "path/to/repo2"
                }
            },
            {
                "name"   : "repo3",
                "groups" : ["group2"],
                "repository" : {
                    "type" : "git",
                    "url" :  "path/to/repo3"
                }
            }
        ]
    }
    
- name   {String} Directory name
- groups {String[]} Optional, Use to groups or alias a directory
- repository.type {String} When it's "git", fed-git will manage the repository
- repository.url {String} URL of the remote repository


## Examples

Clone all repositories

    $ fed clone
    
    On repo1...
    
    Cloning into 'repo1'...
    remote: Counting objects: 21, done.
    remote: Compressing objects: 100% (13/13), done.
    remote: Total 21 (delta 2), reused 19 (delta 0), pack-reused 0
    Unpacking objects: 100% (21/21), done.
    Checking connectivity... done.
    
    On repo2...
    
    Cloning into 'repo2'...
    remote: Counting objects: 15, done.
    remote: Compressing objects: 100% (9/9), done.
    remote: Total 15 (delta 1), reused 14 (delta 0), pack-reused 0
    Unpacking objects: 100% (15/15), done.
    Checking connectivity... done.
    
    On repo3...
        
    Cloning into 'repo3'...
    remote: Counting objects: 12, done.
    remote: Compressing objects: 100% (12/12), done.
    remote: Total 12 (delta 1), reused 11 (delta 0), pack-reused 0
    Unpacking objects: 100% (12/12), done.
    Checking connectivity... done.
    
Get the status of all repositories

    $ fed status
    
    On repo1...
    
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working directory clean
    
    On repo2...
    
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working directory clean

    On repo3...
    
    On branch master
    Your branch is up-to-date with 'origin/master'.
    nothing to commit, working directory clean

Create a branch in all repositories

    $ fed checkout -b featureA
    On repo1...
    
    Switched to a new branch 'featureA'
    
    On repo2...
    
    Switched to a new branch 'featureA'
    
    On repo3...
    
    Switched to a new branch 'featureA'

Create a branch in some repositories 

    $ fed repo1 repo3 git checkout -b featureB
    On repo1...
    
    Switched to a new branch 'featureB'
    
    On repo3...
    
    Switched to a new branch 'featureB'
    
Create a branch for each repositories on a group

    $ fed group2 checkout -b featureC
    On repo2...
    
    Switched to a new branch 'featureC'
    
    On repo3...
    
    Switched to a new branch 'featureC'

