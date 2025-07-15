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
            // Get the 'per_page' parameter from the request, defaulting to 10 if not provided
            $perPage = $request->get('per_page', 10);
            //search
            $search = $request->get('search');


            $query = EmployeeModel::select(['id', 'name', 'email', 'position']);

            //Apply search filter from frontend
            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%");
                });
            }

            $employees = $query->paginate($perPage);

            return EmployeeResource::collection($employees);
        } catch (\Exception $e) {
            // Log the exception or handle it as needed
            return response()->json(['error' => 'Failed to fetch employees'], 500);
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
