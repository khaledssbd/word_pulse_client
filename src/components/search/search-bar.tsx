'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('searchTerm') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    updateURL();
    // Add a small delay to show the skeleton
    setTimeout(() => setIsSearching(false), 500);
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('searchTerm', search.trim());
    if (tag.trim()) params.set('tag', tag.trim());

    const queryString = params.toString();

    router.push(queryString ? `/?${queryString}` : '/');
  };

  const clearSearch = () => {
    setSearch('');
    setTag('');
    router.push('/');
  };

  const clearTag = () => {
    setTag('');
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  };

  const hasActiveFilters =
    searchParams.get('searchTerm') || searchParams.get('tag');

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search articles by title or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full"
          />
          {isSearching && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-600">Searching...</span>
              </div>
            </div>
          )}
        </div>
        <div className="w-48">
          <Input
            type="text"
            placeholder="Filter by tag..."
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
        </div>
        <Button type="submit">
          <Search className="h-4 w-4" />
        </Button>
        {hasActiveFilters && (
          <Button type="button" variant="outline" onClick={clearSearch}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          {search && <Badge variant="secondary">Search: {search}</Badge>}
          {tag && (
            <Badge
              variant="secondary"
              className="cursor-pointer"
              onClick={clearTag}
            >
              Tag: {tag} <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
