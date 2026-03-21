import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminProvider, useAdmin } from '../AdminContext';

// Mock server actions
jest.mock('@/app/actions', () => ({
    checkAuth: jest.fn(),
    loginAdmin: jest.fn(),
    logoutAdmin: jest.fn(),
}));

const { checkAuth, loginAdmin, logoutAdmin } = require('@/app/actions');

// Simple test component that renders admin state
function TestConsumer() {
    const { isAdmin, isEditMode, login, logout, toggleEditMode, isLoading } = useAdmin();
    return (
        <div>
            <span data-testid="loading">{isLoading ? 'loading' : 'ready'}</span>
            <span data-testid="isAdmin">{isAdmin ? 'admin' : 'guest'}</span>
            <span data-testid="isEditMode">{isEditMode ? 'edit' : 'view'}</span>
            <button onClick={() => login('pass')}>login</button>
            <button onClick={logout}>logout</button>
            <button onClick={toggleEditMode}>toggle</button>
        </div>
    );
}

function renderWithProvider() {
    return render(
        <AdminProvider>
            <TestConsumer />
        </AdminProvider>
    );
}

describe('AdminContext – initial state', () => {
    beforeEach(() => jest.clearAllMocks());

    it('starts loading and then resolves as guest when not authenticated', async () => {
        checkAuth.mockResolvedValue(false);
        renderWithProvider();
        expect(screen.getByTestId('loading').textContent).toBe('loading');
        await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('ready'));
        expect(screen.getByTestId('isAdmin').textContent).toBe('guest');
        expect(screen.getByTestId('isEditMode').textContent).toBe('view');
    });

    it('resolves as admin when cookie is valid', async () => {
        checkAuth.mockResolvedValue(true);
        renderWithProvider();
        await waitFor(() => expect(screen.getByTestId('isAdmin').textContent).toBe('admin'));
    });
});

describe('AdminContext – login', () => {
    beforeEach(() => jest.clearAllMocks());

    it('sets isAdmin and isEditMode to true on successful login', async () => {
        checkAuth.mockResolvedValue(false);
        loginAdmin.mockResolvedValue({ success: true });
        renderWithProvider();
        await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('ready'));
        await act(() => userEvent.click(screen.getByText('login')));
        expect(screen.getByTestId('isAdmin').textContent).toBe('admin');
        expect(screen.getByTestId('isEditMode').textContent).toBe('edit');
    });

    it('keeps guest state on failed login', async () => {
        checkAuth.mockResolvedValue(false);
        loginAdmin.mockResolvedValue({ success: false, error: 'Password errata' });
        renderWithProvider();
        await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('ready'));
        await act(() => userEvent.click(screen.getByText('login')));
        expect(screen.getByTestId('isAdmin').textContent).toBe('guest');
    });
});

describe('AdminContext – logout', () => {
    beforeEach(() => jest.clearAllMocks());

    it('clears admin and edit mode on logout', async () => {
        checkAuth.mockResolvedValue(true);
        logoutAdmin.mockResolvedValue({ success: true });
        renderWithProvider();
        await waitFor(() => expect(screen.getByTestId('isAdmin').textContent).toBe('admin'));
        await act(() => userEvent.click(screen.getByText('logout')));
        expect(screen.getByTestId('isAdmin').textContent).toBe('guest');
        expect(screen.getByTestId('isEditMode').textContent).toBe('view');
    });
});

describe('AdminContext – toggleEditMode', () => {
    beforeEach(() => jest.clearAllMocks());

    it('toggles edit mode when admin', async () => {
        checkAuth.mockResolvedValue(true);
        renderWithProvider();
        await waitFor(() => expect(screen.getByTestId('isAdmin').textContent).toBe('admin'));
        expect(screen.getByTestId('isEditMode').textContent).toBe('view');
        await act(() => userEvent.click(screen.getByText('toggle')));
        expect(screen.getByTestId('isEditMode').textContent).toBe('edit');
        await act(() => userEvent.click(screen.getByText('toggle')));
        expect(screen.getByTestId('isEditMode').textContent).toBe('view');
    });

    it('does nothing when not admin', async () => {
        checkAuth.mockResolvedValue(false);
        renderWithProvider();
        await waitFor(() => expect(screen.getByTestId('isAdmin').textContent).toBe('guest'));
        await act(() => userEvent.click(screen.getByText('toggle')));
        expect(screen.getByTestId('isEditMode').textContent).toBe('view');
    });
});
