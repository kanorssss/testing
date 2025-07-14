<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\EmployeeModel;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        try {
            $perPage = max(1, min(100, (int) $request->get('per_page', 10))); //Validate the per_page parameter to prevent potential memory issues or abuse. 
            $employeeQuery = EmployeeModel::select(['id', 'name', 'email', 'position']); //  add any additional query constraints here 
            $paginated = $employeeQuery->paginate($perPage); // paginate the results
            return EmployeeResource::collection($paginated); // Return paginated results as a resource collection
        } catch (\Exception $e) {
            dd($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        //
        try {
            // Validate the request using EmployeeRequest
            $validated = $request->validated();
            $employee = EmployeeModel::create($validated);
            return response()->json($employee, 201);
        } catch (\Exception $e) {
            dd($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, EmployeeModel $employee)
    {
        //
        try {
            $validated = $request->validated();
            $employee->update($validated);
            return new EmployeeResource($employee);
        } catch (\Exception $e) {
            dd($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeModel $employee)
    {
        //
        try {
            $employee->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Delete failed'], 500);
        }
    }
}