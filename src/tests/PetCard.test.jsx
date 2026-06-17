import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PetCard from '../components/PetCard.jsx';

const mockPet = {
  id: 'test-pet',
  name: 'Buddy',
  type: 'Dog',
  breed: 'Labrador',
  age: '2 years',
  location: 'Austin, TX',
  image: '/buddy.jpg',
  description: 'A friendly dog.',
};

const noop = vi.fn();

describe('PetCard', () => {
  it('renders the pet name', () => {
    render(<PetCard pet={mockPet} onSelect={noop} matchPercent={null} />);
    expect(screen.getByText('Buddy')).toBeInTheDocument();
  });

  it('renders the pet type', () => {
    render(<PetCard pet={mockPet} onSelect={noop} matchPercent={null} />);
    expect(screen.getByText('Dog')).toBeInTheDocument();
  });

  it('does not render a match-pill when matchPercent is null', () => {
    render(<PetCard pet={mockPet} onSelect={noop} matchPercent={null} />);
    expect(screen.queryByText(/match/i)).not.toBeInTheDocument();
  });

  it('does not render a match-pill when matchPercent is undefined', () => {
    render(<PetCard pet={mockPet} onSelect={noop} />);
    expect(screen.queryByText(/match/i)).not.toBeInTheDocument();
  });

  it('renders the match-pill with the correct percentage when matchPercent is provided', () => {
    render(<PetCard pet={mockPet} onSelect={noop} matchPercent={85} />);
    expect(screen.getByText('85% match')).toBeInTheDocument();
  });
});
